# Database setup

This directory contains information about setting up the database.

## Prerequisites

It is required to download and install the [MariaDB Server 10.X](https://mariadb.org/download/).  
*Important:* set the root password in the MariaDB installer window.
Otherwise you have to set it later via `mysqladmin --user=root password "changeme"`

### Add bin path to `$PATH` variable

To access the MariaDB command line programs such as `mysql.exe` and `mysqladmin.exe`, make sure to append the MariaDB
bin folder path to the `$PATH` variable.

Find out the MariaDB bin path which looks usually like `C:\Program Files\MariaDB 10.6\bin` and set it as environment
variable.

You can then check e.g. via PowerShell or Command Prompt `mysql --version` whether the bin path is set up correctly.  
It might be important to run `refreshenv` to reload environment variables on Windows.

### Set up database user `beetmanager`

Open the mysql command prompt via `mysql -u root -p "changeme"` in terminal.
Execute the following commands.

#### 1. Create database `beetmanager` if it does not exist:

```mariadb
CREATE DATABASE IF NOT EXISTS beetmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2. Create database user

```mariadb
CREATE USER 'beetmanager'@'localhost' IDENTIFIED BY 'changeme';
```

#### 3. Grant privileges on database

```mariadb
GRANT ALL PRIVILEGES ON beetmanager.* TO 'beetmanager'@'localhost';
```

#### (optionally) 4. Flush privileges

If it is required to, because you cannot connect to the database, flush the privileges

```mariadb
FLUSH PRIVILEGES;
```

#### Exit mysql prompt

```
exit
```

## Import

Make sure you change to directory e.g. `..beetmanager/database` where both files `data-dump.sql`
and `structure-dump.sql` reside.

You can use file `data-dump.sql` for a ready-to-use database.

### Windows _PowerShell / Command Prompt)_

```powershell
cmd.exe /c "mysql -u beetmanager -p changeme beetmanager < data-dump.sql"
```

### Linux _(Shellscript)_

```shell
mysql -u beetmanager -p "changeme" beetmanager < data-dump.sql
```

## (optional) Export

To dump all data from database `beetmanager` execute the following command:

### Windows _PowerShell / Command Prompt)_

```powershell
cmd.exe /c "mysqldump -u beetmanager -p changeme beetmanager > data-dump.sql"
```

### Linux _(Shellscript)_

```shell
mysqldump -u beetmanager -p "changeme" beetmanager > data-dump.sql
```

## Troubleshooting

> Problem: *Command `mysql` or `mysqladmin not found:`*  
> Possible solution: Check whether you have set up the `$PATH` variable correctly  

> Problem: *`Access denied for user x@y (using password: NO)`*  
> You probably have no password `-p` argument passed, although the given database user is password protected.  

