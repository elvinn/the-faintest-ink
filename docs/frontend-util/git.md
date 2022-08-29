# Git

## git diff .. vs ...

``` text
o-o-X-o-o-o-o-Z master
     \
     -o-o-o-o-o-Y feature-x
```

对于上述这样 git 的提交历史，在 diff 时会存在两种方式：

1. `git diff master..feature-x`
2. `git diff master...feature-x`

那么大家知道下面这三个问题的答案吗：

1. 两种方式有什么区别？
2. 在什么情况下这两者的结果是一样的？
3. Github 上提交 Pull Request 采用的是哪种方式？

### 两者的区别

对于 `git diff master..feature-x`，它对比的是 `Z` 和 `Y` 节点，也就是两个分支上最新的提交节点。

对于 `git diff master...feature-x`，它对比的是 `X` 和 `Y` 节点，也就是先找出两个分支的公共节点，然后再和后一个分支的最新节点进行对比。

知道了这两者的区别之后，那么就可以看出在下面两种提交情况下，`..` 和 `...` 的对比结果是一样的：

``` text
o-o-X master
     \
     -o-o-o-o-o-Y feature-x
```

``` text
o-o-X-o-o-o-o-Z master
     \         \
     -o-o-o-o-o-Y feature-x
```

### Github Pull Request 采用的 diff 方式

> By default, pull requests on GitHub show a three-dot diff.

根据 [官方文档](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-comparing-branches-in-pull-requests#three-dot-and-two-dot-git-diff-comparisons) 的说法，Github 采用的是三个点（`...`，Three dot）的对比方式，虽然没有说明原因，但我个人觉得主要是因为这样可以保持 Pull Request 对比文件差异的一致性，要不然假如目标分支有新的提交，就会导致得出的差异存在变化。

那假如想在 Pull Request 的对比中想看两个分支最新节点的差异该怎么办呢？合并一下目标分支的最新代码即可。

## git reflog 用法

`reflog` 是 *reference log* 的缩写，也就是**参考日志**的含义。通过 `git reflog`，可以列出本地所有的 git 操作。

常用的场景是有时候本地执行 `git reset {hash_id} --hard` 导致代码回滚，且无法通过 `git log` 找出被回滚 commit 的 id。此时可以通过 `git reflog` 列出每一步操作，从而找回丢失的代码。

<Vssue title="Git" />
