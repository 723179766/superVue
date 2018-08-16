let treeData = {
  uid: 10000,
  name: 'Root Tree',
  children: []
}

// model 绑定的数据格式
// @loadChild="loadChild" 懒加载加载子节点
// @loadMore="loadMore" 分页加载当前节点
// getChecked() 获取勾选的节点
// searchData() 备份节点
// resetData()  重置备份的节点
