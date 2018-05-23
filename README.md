# App Name - *ExpensesRecord*

**ExpensesRecord** is a web application that keeps year and monthly records of
expenses.

## Frameworks
* **Materializecss** for material design implementation [Materializecss](https://materializecss.com/)

* **LAMP** scotch/box LAMP vagrant box is used for convenience. [scotch/box](https://app.vagrantup.com/scotch/boxes/box)


## Description

* Made in php html/css/jQuery
* By default it displays a table with a zero value for every category.
* User can edit and change the value. All data is saved on files(one file for each month) in  JSON format.
* Data is saved in files instead of a database for fasten development and setup.


The following **features** will be implemented:

- [ ] Improve user interface on edit mode.
- [ ] Fix php errors.


## Notes

- How to break/exit from a each() function in JQuery?
``` javascript
$("#something").find("strengths").each(function() {
// Code
// To escape from this block based on a condition:
if (something) return false;
// return true; or return is equal to continue;
});
```
