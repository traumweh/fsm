#!/usr/bin/python

import os, time, sys, shutil, subprocess

def sources():
	path = './src/'
	return [os.path.join(base, f) for base, folders, files in os.walk(path) for f in files if f.endswith('.js')]

def build():
	path = './www/fsm.js'
	data = '\n'.join(open(file, 'r').read() for file in sources())
	with open(path, 'w') as f:
		f.write(data)
	print 'built %s (%u bytes)' % (path, len(data))

def stat():
	return [os.stat(file).st_mtime for file in sources()]

def monitor():
	a = stat()
	while True:
		time.sleep(0.5)
		b = stat()
		if a != b:
			a = b
			build()

def deploy():
	path = './www/'
	def move(file):
		shutil.copy(path+file)

	subprocess.call("git add .; git commit -am \"deploying\"; git push)")
	subprocess.call("git co gh-pages")

	move('fsm.js')
	move('index.html')
	for obj in os.listdir('./'):
		if (os.path.isdir(obj) && obj != '.git'):
			shutil.rmtree(obj)

	subprocess.call('git add .; git commit -am \"deploying\"; git push')
	subprocess.call('git co master')

if __name__ == '__main__':
	build()
	if '--watch' in sys.argv:
		monitor()
	if '--deploy' in sys.argv:
		deploy()
