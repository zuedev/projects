#!/bin/bash

tmp="/tmp/repo_sync.bash/"
public="/z/public_git_repos/"

rm -rf $tmp && mkdir $tmp && cd $tmp

cat repos | while read repo; do git clone --bare $repo; done

rsync -r $tmp $public