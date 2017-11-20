// app.js

var shell = require('shelljs');
// startAppDaemon();

function startAppTracking() {
    var cmd = "ps aux | grep get-foreground-apps.py";
    var child = shell.exec(cmd, {async: true});
    child.stdout.on('data', function (data) {
        var isRunning = data.split("\n").length > 3;
        var msg = "Daemon already running...<br>";
        if (!isRunning) {
            msg = "Started daemon...<br>";
            startPythonDaemon();
        }
        console.log(msg);
        document.getElementById("span-cmd-response").innerHTML = msg;
    });
}

function stopAppTracking() {
    var cmd = "ps aux | grep get-foreground-apps.py";
    var child = shell.exec(cmd, {async: true});
    child.stdout.on('data', function (data) {
        var isRunning = data.split("\n").length > 3;
        var msg = "Stop ignored. Daemon isn't running.<br>";
        if (isRunning) {
            msg = "Stopped deamon!<br>";
            stopPythonDaemon();
        }
        console.log(msg);
        document.getElementById("span-cmd-response").innerHTML = msg;
    });

}

function startPythonDaemon() {
    var cmd = "python get-foreground-apps.py";
    execCommand(cmd)
}

function stopPythonDaemon() {
    var cmd = "killall python get-foreground-apps.py";
    execCommand(cmd)
}

function execCommand(cmd) {
    var child = shell.exec(cmd, {async: true});
    child.stdout.on('data', function (data) {
        console.log("shell cmd response: \n", data);
    });
}

function showRecentApps() {
    var cmd = "tail fg-app-log.csv";
    var child = shell.exec(cmd, {async: true});
    child.stdout.on('data', function (data) {
        data = data.replace(/\n/g, "<br>");
        document.getElementById("span-apps-logged").innerHTML = data;
    });
}

function runShellUICommand() {
    console.log('just clicked "runShell()"');

    var cmd = document.getElementById("input-cmd").value;
    if (!cmd) {
        return;
    }

    var child = shell.exec(cmd, {async: true});
    child.stdout.on('data', function (data) {
        data = data.replace(/\n/g, "<br>");
        document.getElementById("span-cmd-response").innerHTML = data;
    });
}

function notifyUser() {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification("Finally did it!", {
            body: "Turn up time!!"
        });
    }
}
