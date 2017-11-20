######################################################
# obtain the foreground application running in MAC OS
######################################################

from AppKit import NSWorkspace
import time
import datetime


def append_to_file(filename, row):
    with open(filename, 'a') as f:
        f.write(row)


def print_fg_app():
    while True:
        active_app_name = NSWorkspace.sharedWorkspace().activeApplication()['NSApplicationName']
        row = "%s, %20s\n" % (datetime.datetime.now(), active_app_name)
        append_to_file('fg-app-log.csv', row)
        print row
        time.sleep(5)


if __name__ == "__main__":
    print_fg_app()
