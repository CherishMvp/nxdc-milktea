#!/bin/bash

# 检查是否存在Git仓库
if ! [ -d .git ]; then
  echo "当前目录不是一个Git仓库"
  exit 1
fi

# 检查是否存在更改的文件
if [[ -z "$(git status --porcelain)" ]]; then
  echo "没有更改的文件"
  exit 0
fi

# 添加所有更改的文件
git add .

# 提交更改
git commit -m "自动提交更改"

# 推送到云端
git push

echo "更改已提交并推送到云端"
