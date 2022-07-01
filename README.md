# Beet-Manager

Beet-Manager is a gardening tool to help you organise beds in a symbiotic way.

## Installation

### Database

Download and install [MariaDB Community Server](https://mariadb.com/downloads/)

#### Password

If asked, set a root user password.

This can also be done after installation using the following command in your terminal:

```shell
mysqladmin --user=root password "changeme"
```

This command only works when the MariaDB `bin/` folder path is registered in `PATH` variable.

#### Database Setup

Open the MariaDB command line interface via:

```shell
mysql -u root -p # use root password
```

Create `beetmanager` database:

```sql
CREATE DATABASE IF NOT EXISTS beetmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Create `beetmanager` user:

```sql
CREATE USER 'beetmanager'@'localhost' IDENTIFIED BY 'changeme'; # you need set the same password to config/*.json
```

Grant privileges to user `beetmanager`:

```sql
GRANT ALL PRIVILEGES ON beetmanager.* TO 'beetmanager'@'localhost';
```

If there are problems with privileges, run:

```sql
FLUSH PRIVILEGES;
```

Use `exit` to exit the MariaDB CLI.

#### Data Import

To import the existing data dump provided with this [software](database/data-dump.sql), run the following command in
your _Windows terminal_:

```powershell
cmd.exe /c "mysql -u beetmanager -p beetmanager < database/data-dump.sql"
```

**Linux (Shellscript)**

```shell
mysql -u beetmanager -p beetmanager < database/data-dump.sql
```

### Backend

The backend project is a Nest.js RESTful web service that can be run platform independent.

### Configuration

There are three configuration files in [backend/config/](backend/config/):

- default.json _(config file with default values)_
- development.json _(config file for development mode)_
- production.json _(config file for production mode)_

You need backend/config/production.json and set your preconfigured database information.

You can also see other configuration values:

| Name                          | Description                                                                         |
|-------------------------------|-------------------------------------------------------------------------------------|
| `database.host`               | Database hostname e.g. `localhost`                                                  |
| `database.user`               | Database user e.g. `beetmanager`                                                    |
| `database.password`           | Database password e.g. `beetmanager`                                                |
| `database.name`               | Database name e.g. `beetmanager`                                                    |
| `database.port`               | Database port number e.g. `3306`                                                    |
| `port`                        | Backend application port number e.g. `3000`                                         |
| `jwt.expiresIn`               | JWT token expiration time e.g. (in) `7d`                                            |
| `jwt.ignoreExpiration`        | Whether JWT tokens should expire. Should be `false`. Only for development purposes! |
| `jwt.secretKey`               | A random string secret you should set in production. Keep it at a secure place.     |
| `user.name.minimumLength`     | Password minimum string length e.g. `3`                                             |
| `user.name.maximumLength`     | Password maximum string length e.g. `20`                                            |
| `user.password.minimumLength` | Password minimum string length e.g. `14`                                            |
| `user.password.maximumLength` | Password maximum string length e.g. `100`                                           |
| `user.email.minimumLength`    | Email address minimum string length e.g. `6` _(a@a.ab)_                             |
| `user.email.maximumLength`    | Email address maximum string length e.g. `60`                                       |

### Starting server

Go to the backend and run it via npm:

```shell
cd backend
npm run start:prod
```

### Frontend

The frontend project is a React web service using Angular that can be run platform independent.

### Starting server

Make sure you start the `backend` first.

Go to the frontend and run it via npm:

```shell
cd frontend # check if you are still in directory "backend"
npm run start # accept when it asks you to start in another port
```

## Usage

### Create Account 

Click on `Register` on the login page to open the register formular. 
Enter your desired account details to proceed and click `Register`.  

### Login

Enter your account details to login and click `Login`.  
You will then get redirected to the Home page.

### Suggestions - Home

After logging in you can choose from the plants suggested and add plants via drag and drop to your bed.  
The suggested plants will be updated after each time you add another plant.  

- _green_ background: the plants will harmonize well and support themselves
- _light_ background: the plant does neither harmonize positively nor negatively with your current bed
- _dark_ background: the plant does not harmonize well with your current bed

![Seeing different plant suggestions](img/screenshot.png)

### Information

You can request and see current weather information on the info page which is reachable via the hamburger menu.

### Profile

Your current account details can be both viewed and edited on this page.  
Also, if you wish to delete your account, feel free to do that here.  

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

All rights reserved.

### Icons

Material UI icons licensed under Apache license  

Plant icons are free:

| Icon                                                    | License        |
|---------------------------------------------------------|----------------|
| [Tomato](https://www.svgrepo.com/svg/7878/tomato)       | CC0 License    |
| [Cucumber](https://www.svgrepo.com/svg/396244/cucumber) | Apache License |
| [Potato](https://www.svgrepo.com/svg/398113/potato)     | Apache License |
| [Carrot](https://www.svgrepo.com/svg/5153/carrot)       | CC0 License    |
| [Onion](https://www.svgrepo.com/svg/130759/onion)       | CC0 License    |

Compost icon: third party, all rights reserved
