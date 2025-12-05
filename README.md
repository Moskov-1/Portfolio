
# Linux Ops Command Cookbook

A curated list of unique shell commands and admin snippets extracted from your input, with short explanations and example usage.  
Sorted from **Basic → Intermediate → Advanced** so you can learn progressively.

---

## Table of contents
1. Basic commands
2. Intermediate commands
3. Advanced commands
4. How to use this file
5. License

---

# 1) Basic commands
These are common everyday commands that are safe and useful for general system inspection and file operations.

### `ls -la`
List files (long format) including hidden files.
Example: `ls -la /root/.ssh/`

### `grep <pattern> <file>`
Search for pattern in a file.
Example: `grep -ri "N4SKFC7WUPKAR36XSFRSM2AHGE" .`

### `ps aux`
Show running processes.
Example: `ps aux`

### `ps aux | awk '{print $6/1024 " MB\t\t" $11}' | sort -n`
List processes sorted by resident memory (MB).  
Explanation: `$6` is RSS (KB), dividing by 1024 gives MB.

### `netstat -ltup`
List listening ports with program names (Linux).  
Example: `netstat -ltup | grep zabbix_agentd`

### `lsblk`
List block devices (disks, partitions).
Example: `lsblk`

### `du -sh *`
Show human-readable directory sizes.
Example: `du -sh * 2>/dev/null | sort -rh | head -n 10`

### `cp -rf <src> <dest>`
Force-copy recursively.
Example: `cp -rf /home/rocky/2025-03-22/* /var/www/umv2`

### `mv <src> <dest>`
Move/rename files or folders.
Example: `mv log/ backup-log-17th-june-23`

### `tar -cvzf <archive>.tar.gz <files>`
Create gzipped tarball.
Example: `tar -cvzf /home/ec2-user/22_Aug_2024-10.00.tar.gz 22_Aug_2024-10.00`

### `tar -xvzf <archive>.tar.gz -C <dir>/`
Extract tarball into directory.
Example: `tar -xvzf 26th_june_24.tar.gz -C 2021/`

### `truncate -s 0 <file>`
Empty (zero) a file safely.
Example: `truncate -s 0 /path/to/your/logfile.log`

### `echo -n > <file>`
Another quick way to empty file contents.
Example: `echo -n > /path/to/your/logfile.log`

### `touch <file>`
Create an empty file or update timestamp.
Example: `touch zabbix_proxy.pid`

### `chown -R <user>:<group> <path>`
Change ownership recursively.
Example: `chown -R zabbix:zabbix /path/to/folder`

### `chmod +x <file>`
Make file executable.
Example: `chmod +x /tmp/zabbix_proxy.pid`

### `history | grep <term>`
Search command history.
Example: `history | grep ssh`

### `ssh-keygen -t ed25519 -C "comment"`
Generate SSH key (ed25519).
Example: `ssh-keygen -t ed25519 -C "ubuntu@172.20.1.26"`

### `scp <file> user@host:/path/`
Secure copy to remote host.
Example: `scp /path/file.txt root@10.0.3.61:/path/destination/`

---

# 2) Intermediate commands
Useful for server maintenance, services, networking, backups, and small automation.

### `systemctl <start|stop|status|enable|daemon-reload> <service>`
Control systemd services.
Example: `sudo systemctl start mongod`  
`sudo systemctl daemon-reload`

### `service --status-all | grep running`
Check services (SysV style compatibility).
Example: `service --status-all | grep running`

### `chkconfig --list | grep '3:on'`
RHEL/CentOS legacy runlevel service check.

### `yum install -y <package>`
Install packages on RHEL/CentOS.
Example: `yum install -y telnet`

### `yum --security check-update -y`
Check for security updates (requires `yum-plugin-security`).

### `yum update --security ...` (example patterns in notes)
Use with caution — check docs for exact flags on your distro.

### `iptables -A INPUT -s <ip>/32 -p tcp --dport <port> -j ACCEPT`
Add iptables rule allowing traffic from IP to port.
Example: `iptables -A INPUT -s 10.239.146.138/32 -p tcp --dport 10050 -j ACCEPT`

### `firewall-cmd --list-all`
Show firewalld configuration.
Example: `firewall-cmd --add-port=10050/tcp --permanent`

### `nc -zv <host> <port>`
TCP port probe (netcat).
Example: `nc -zv 10.239.146.138 10051`

### `docker rmi $(docker images --filter "dangling=true" -q --no-trunc)`
Remove dangling images to free space.

### `mysqldump -u root -p <db> > backup.sql`
Dump a MySQL database.
Example: `mysqldump -u root -p drupal > drupal_backup.sql`

### `mongodump --db <db> --out <path>`
Dump MongoDB database (mongodump tool).
Example: `./mongodump --db test --out /mongobackup/test`

### `mongorestore` / `mongodump` (mentioned)
Use for MongoDB backups and restores.

### `nohup <cmd> >> logfile &`
Run a command in background persistently.
Example: `nohup /root/scripts/sashimi-si.sh >> /root/scripts/sashimi-si.log &`

### `sync && echo 1 > /proc/sys/vm/drop_caches`
Drop pagecache (free cached memory). Use with caution.

### `aws s3 cp` and `aws s3 sync`
Copy or sync objects to/from S3. Examples from notes:
- `aws s3 cp s3://my-bucket/path/ . --profile restoreusr --recursive`
- `aws s3 sync s3://my-bucket/... login --profile restoreusr`

### `find <path> -name '*.txt' -print0 | xargs -0 tail -n 2 | grep 'Item'`
Find and process files robustly with NUL separators (safe with spaces).

### `grep -v -e '^#' -e '^$' <file>`
Show non-comment and non-empty lines of config.

### `setfacl -m u:jenkins:r <file>`
Set file ACL to give jenkins read permission.

### `usermod -aG <group> <user>`
Add user to a supplementary group.
Example: `usermod -aG people test`

### `chmod 775 <path>`
Set directory permissions.

---

# 3) Advanced commands
Powerful admin tasks and service configuration — use carefully.

### `systemctl list-units --type=service --state=running`
List running systemd services.

### `systemctl status <service>`
Check service status, logs, and failures.
Example: `systemctl status sav-protect.service`

### `zabbix_proxy -R config_cache_reload`
Reload Zabbix proxy configuration cache (when using Zabbix).

### `/usr/sbin/zabbix_agentd -c /etc/zabbix_agentd.conf`
Start Zabbix agent with specified config. Useful in service files.

### Creating a systemd unit (example)
```
/etc/systemd/system/zabbix-proxy.service
[Unit]
Description=Zabbix Proxy
After=network.target
[Service]
Type=simple
ExecStart=/usr/sbin/zabbix_proxy -c /usr/etc/zabbix_proxy.conf
Restart=on-failure
[Install]
WantedBy=multi-user.target
```
Then `sudo systemctl daemon-reload && sudo systemctl enable zabbix-proxy && sudo systemctl start zabbix-proxy`

### `sudo growpart /dev/nvme0n1 5` and `sudo xfs_growfs /`
Expand partition and grow XFS filesystem (cloud disk resizing).

### `mongod --config /etc/mongod.conf` and systemd unit snippet
Run MongoDB with config file or as service (see notes for sample service file).

### `tr -d '\r' < file > fixed-file`
Remove CR characters (useful when fixing Windows line endings in scripts).

### `sudo setenforce 0` and editing `/etc/selinux/config`
Temporarily/perm disable SELinux (use with caution — consider proper policy changes instead).

### `rs.status()` via `mongosh` one-liners
Inspect MongoDB replication set status:
```
/usr/bin/mongosh --quiet --eval 'rs.status().members.forEach(m => print(m.name.split(":")[0] + " - " + m.stateStr))'
```

### `mv /mnt/mongo-backup/!(delete_all) /mnt/mongo-backup/delete_all/`
Bash extended globbing example: move all except the `delete_all` directory. Requires `shopt -s extglob`.

### `iptables -A OUTPUT -p tcp --dport 80 -d mirrorlist.centos.org -j ACCEPT`
Allow outgoing traffic to a specific host/port for yum mirror access.

### `yes | /bin/cp -rf * /dest/`
Force-confirm cp repeatedly with `yes` (be careful — destructive).

### `chmod/chown` advanced patterns (batch ownership changes across site/backup operations)

---

# 4) Notes & Safety
- Many commands shown are potentially destructive (e.g., `rm`, `cp -rf`, `yes | cp -rf`, `truncate`, iptables rules). **Always test on non-production systems first** and ensure you understand the implications.
- Commands touching network/firewall (iptables/firewalld) may lock you out if executed on remote machines without console access.
- Filesystem resizing and partition changes (`growpart`, `xfs_growfs`) must be done with snapshots/backups and understanding of cloud provider behaviour.
- SELinux toggles and `echo 1 > /proc/sys/vm/drop_caches` are system-wide operations — consider safer alternatives.

---

# 5) How to use this README
- Use Basic commands to inspect and copy files.
- Use Intermediate commands for service and backup management.
- Use Advanced commands when performing maintenance, automation, or scaling — and always after backups.

---

# License
This document is provided as-is for internal ops use. No warranty.
