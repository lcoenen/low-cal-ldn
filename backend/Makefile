all: compile run

compile:
	nix-shell https://holochain.love --run 'hc package'

run:
	nix-shell https://holochain.love --run 'hc run -i http'
