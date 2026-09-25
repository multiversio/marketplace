.PHONY: install serve build clean check

install:
	python -m pip install -r requirements.txt

serve:
	mkdocs serve

build:
	mkdocs build --strict

clean:
	rm -rf site

check: build
