# The Docker Book

[[toc]]

## Chapter 3. Getting Started with Docker

```bash
sudo docker run -i -t ubuntu /bin/bash
```

- `-i` keeps `STDIN` open from the container.
- `-t` tells Docker to assign a pseudo-tty to the container.
- `ubuntu` is a stock image from Docker Hub.
- `/bin/bash` is the command to be run in the container.

---

```bash
docker ps -a
```

- `-a` shows all containers.

```bash
docker ps -l
```

- `-l` shows the last container that was run.
- Use `--format` to control how output info is displayed.

---

```bash
sudo docker run --name bob_the_container -i -t ubuntu /bin/bash
```

- `--name` specifies the name of a container.

---

```bash
sudo docker start bob_the_container
```

- `start` starts a stopped container.

---

```bash
sudo docker attach bob_the_container
```

- `attach` attaches local `STDIN`, `STDOUT`, and `STDERR` streams to a running container.

---

```bash
sudo docker run --name daemon_dave -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
```

- `-d` detaches the container to the background.

---

```bash
sudo docker logs -ft daemon_dave
```

- `logs` fetches the logs of a container.
- `-f` shows the last few logs.
- `-t` shows the timestamp of each log.

```bash
sudo docker logs --tail 10 daemon_dave
```

- `--tail` shows the last 10 logs.

---

```bash
sudo docker run --log-driver="syslog" --name daemon_dwayne -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
```

- `--log-driver` controls the logging driver used by a container.

---

```bash
sudo docker top daemon_dave
```

- `top` shows the running process of a container.

---

```bash
sudo docker stats daemon_dave daemon_dwayne
```

- `stats` shows the statistics of one or more containers.

---

```bash
sudo docker exec -d daemon_dave touch /etc/new_config_file
```

- `exec` runs a command in a container.

---

```bash
sudo docker stop daemon_dave
```

- `stop` stops a container.

---

```bash
sudo docker run --restart=always --name daemon_alice -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
```

- `--restart` checks the container's exit code and makes a decision whether or not to restart.
- You can specify a value of `on-failure`, e.g. `--restart=on-failure:5`.

---

```bash
sudo docker inspect daemon_alice
```

```bash
sudo docker inspect --format='{{ .State.Running }}'
```

```bash
sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}'
```

- `inspect` shows low-level info on containers.

---

```bash
sudo docker rm 80430f8d0921
```

- `rm` removes a container.

```bash
sudo docker rm -f `sudo docker ps -a -q`
```

- Delete all containers.
- `-q` only returns container IDs.
- `-f` force removes any running containers.
