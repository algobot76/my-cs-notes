# Terraform: Up & Running (2nd Edition)

[[toc]]

## Chapter 2. Getting Started with Terraform

### Deploy a Single Server

```
resource "<PROVIDER>_<TYPE>" "<NAME>" {
  [CONFIG ...]
}
```

- `PROVIDER`: name of a provider (e.g. aws)
- `TYPE`: type of resource (e.g. instance)
- `NAME`: identifier to refer to this resource
- `CONFIG`: one or more argument specific to the resource

TerraForm Commands:

- `init`: download code for providers
- `plan`: preview changes
- `apply`: show the same `plan` output and ask to confirmation

Git's `.gitignore` file:

```
.terraform
*.tfstate
*.tfstate.backup
```

### Deploy a Single Web Server

```
resource "aws_instance" "example" {
  ami                    = "ami-0c55b159cbfafe1f0"
  instance_type          = "t2.micro"

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p 8080 &
              EOF

  tags = {
    Name = "terraform-example"
  }
}

resource "aws_security_group" "instance" {
  name = "terraform-example-instance"

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

### Deploy a Configurable Web Server

Define input variables:

```
variable "NAME" {
  [CONFIG ...]
}
```

- `description` (optional): variable description.
- `default` (optional): default value.
- `type` (optional): type constraints, including `string`, `number`, `bool`, `list`, `map`, `set`, `object`, `tuple`, `any`.

You can set a variable using `-var`:

```bash
$ terraform plan -var "server_port=8080"
```

You can also set a variable using `TF_VAR_<name>`:

```bash
$ export TF_VAR_server_port=8080
$ terraform plan
```

To use the value from an input variable, use variable reference:

```
var.<VARIABLE_NAME>
```

Use string interpolation: `"${...}"`:

```
user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p ${var.server_port} &
              EOF
```

Define output variables:

```
output "<NAME>" {
  value = <VALUE>
  [CONFIG ...]
}
```

- `description`: variable description.
- `sensitive`: if `true`, `apply` command will not log the variable.

TerraForm commands:

- `output`: list all outputs without applying any changes.
- `output <OUTPUT_NAME>`: see the value of `<OUTPUT_NAME>`.

### Deploying a Cluster of Web Servers

Data source is a piece of read-only information that is fetched from the provider:

```
data "<PROVIDER>_<TYPE>" "<NAME>" {
  [CONFIG ...]
}
```

- `PROVIDER`: name of a provider (e.g., aws).
- `TYPE`: type of data source you want to use (e.g., vpc).
- `CONFIG`: parameters specific to the data source.

---

```
data "aws_vpc" "default" {
  default = true
}
```

```
data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}
```

```
resource "aws_launch_configuration" "example" {
  image_id        = "ami-0c55b159cbfafe1f0"
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.instance.id]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p ${var.server_port} &
              EOF

  # Required when using a launch configuration with an auto scaling group.
  # https://www.terraform.io/docs/providers/aws/r/launch_configuration.html
  lifecycle {
    create_before_destroy = true
  }
}
```

- `lifecycle`: configure how the resource is created, updated, and/or deleted.

```
resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier  = data.aws_subnet_ids.default.ids

  min_size = 2
  max_size = 10

  tag {
    key                 = "Name"
    value               = "terraform-asg-example"
    propagate_at_launch = true
  }
}
```

### Deploying a Load Balancer

- Application Load Balancer (ALB): load balancing of HTTP and HTTPS traffic.
- Network Load Balancer (NLB): load balancing of TCP, UDP, and TLS traffic.
- Classic Load Balancer (CLB): load balancing of HTTP, HTTPS, TCP, and TLS traffic but less features than either ALB or NLB.

---

ALB consists of 3 parts:

- Listener: listens on a specific port (e.g. 80) and protocol (e.g. HTTP).
- Listener rule: takes request that come into a listener and sends those that match specific paths.
- Target groups: one or more servers that receive requests from the load balancer.

---

```
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.example.arn
  port              = 80
  protocol          = "HTTP"

  # By default, return a simple 404 page
  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "404: page not found"
      status_code  = 404
    }
  }
}
```

```
resource "aws_security_group" "alb" {
  name = "terraform-example-alb"

  # Allow inbound HTTP requests
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound requests
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

```
resource "aws_lb" "example" {
  name               = "terraform-asg-example"
  load_balancer_type = "application"
  subnets            = data.aws_subnet_ids.default.ids
  security_groups    = [aws_security_group.alb.id]
}
```

```
resource "aws_lb_target_group" "asg" {
  name     = "terraform-asg-example"
  port     = var.server_port
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 15
    timeout             = 3
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}
```

```
resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.name
  vpc_zone_identifier  = data.aws_subnet_ids.default.ids

  target_group_arns = [aws_lb_target_group.asg.arn]
  health_check_type = "ELB"

  min_size = 2
  max_size = 10

  tag {
    key                 = "Name"
    value               = "terraform-asg-example"
    propagate_at_launch = true
  }
}
```

```
resource "aws_lb_listener_rule" "asg" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 100

  condition {
    field  = "path-pattern"
    values = ["*"]
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.asg.arn
  }
}
```

```
output "alb_dns_name" {
  value       = aws_lb.example.dns_name
  description = "The domain name of the load balancer"
}
```
