<template>
  <div class="icons-container">
    <p class="warn-content">
      <a href="https://panjiachen.github.io/vue-element-admin-site/#/icon" target="_blank">Add and use
      </a>
    </p>
    <div class="icons-wrapper">
      <div v-for="item of iconsMap" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
        <el-tooltip placement="top">
          <div slot="content">
            {{generateIconCode(item)}}
          </div>
          <div class="icon-item">
            <svg-icon class-name="disabled" :icon-class="item" />
            <span>{{item}}</span>
          </div>
        </el-tooltip>
      </div>
    </div>

     <div class="main markdown">
        <h1>IconFont 图标</h1>
        <ul class="icon_lists clear">

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xinlangweibo"></use>
                    </svg>
                    <div class="name">新浪微博</div>
                    <div class="fontclass">#icon-xinlangweibo</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-time"></use>
                    </svg>
                    <div class="name">时间</div>
                    <div class="fontclass">#icon-time</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin"></use>
                    </svg>
                    <div class="name">微信</div>
                    <div class="fontclass">#icon-weixin</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tixing"></use>
                    </svg>
                    <div class="name">提醒</div>
                    <div class="fontclass">#icon-tixing</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-qq"></use>
                    </svg>
                    <div class="name">qq</div>
                    <div class="fontclass">#icon-qq</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfontxinjianwenjian"></use>
                    </svg>
                    <div class="name">新建文件</div>
                    <div class="fontclass">#icon-iconfontxinjianwenjian</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-kongjian"></use>
                    </svg>
                    <div class="name">空间</div>
                    <div class="fontclass">#icon-kongjian</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-admin"></use>
                    </svg>
                    <div class="name">管理员</div>
                    <div class="fontclass">#icon-admin</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfontmiantiaofenxiangfuzhilianjie"></use>
                    </svg>
                    <div class="name">复制链接</div>
                    <div class="fontclass">#icon-iconfontmiantiaofenxiangfuzhilianjie</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-success"></use>
                    </svg>
                    <div class="name">成功</div>
                    <div class="fontclass">#icon-success</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiahao"></use>
                    </svg>
                    <div class="name">jiahao</div>
                    <div class="fontclass">#icon-jiahao</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fanhui1"></use>
                    </svg>
                    <div class="name">返回</div>
                    <div class="fontclass">#icon-fanhui1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home"></use>
                    </svg>
                    <div class="name">首页</div>
                    <div class="fontclass">#icon-home</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caidan"></use>
                    </svg>
                    <div class="name">菜单</div>
                    <div class="fontclass">#icon-caidan</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zanting"></use>
                    </svg>
                    <div class="name">暂停</div>
                    <div class="fontclass">#icon-zanting</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shanchu"></use>
                    </svg>
                    <div class="name">删除</div>
                    <div class="fontclass">#icon-shanchu</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shanchu1"></use>
                    </svg>
                    <div class="name">删除</div>
                    <div class="fontclass">#icon-shanchu1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caidandisc"></use>
                    </svg>
                    <div class="name">菜单_disc</div>
                    <div class="fontclass">#icon-caidandisc</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mingpianxuanzhong01"></use>
                    </svg>
                    <div class="name">名片</div>
                    <div class="fontclass">#icon-mingpianxuanzhong01</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiantou-copy-copy-copy"></use>
                    </svg>
                    <div class="name">箭头</div>
                    <div class="fontclass">#icon-jiantou-copy-copy-copy</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-plus"></use>
                    </svg>
                    <div class="name">加号</div>
                    <div class="fontclass">#icon-plus</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-hide"></use>
                    </svg>
                    <div class="name">已隐藏</div>
                    <div class="fontclass">#icon-hide</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-addP"></use>
                    </svg>
                    <div class="name">添加员工</div>
                    <div class="fontclass">#icon-addP</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tongguo"></use>
                    </svg>
                    <div class="name">通过</div>
                    <div class="fontclass">#icon-tongguo</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhongmingming16px"></use>
                    </svg>
                    <div class="name">重命名16px</div>
                    <div class="fontclass">#icon-zhongmingming16px</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-quxiao"></use>
                    </svg>
                    <div class="name">取消</div>
                    <div class="fontclass">#icon-quxiao</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tianjiabumen"></use>
                    </svg>
                    <div class="name">添加部门</div>
                    <div class="fontclass">#icon-tianjiabumen</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wenjianjia"></use>
                    </svg>
                    <div class="name">文件夹</div>
                    <div class="fontclass">#icon-wenjianjia</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfontyitijiao"></use>
                    </svg>
                    <div class="name">iconfont-已提交</div>
                    <div class="fontclass">#icon-iconfontyitijiao</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-down"></use>
                    </svg>
                    <div class="name">down</div>
                    <div class="fontclass">#icon-down</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-up"></use>
                    </svg>
                    <div class="name">up</div>
                    <div class="fontclass">#icon-up</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-horn"></use>
                    </svg>
                    <div class="name">horn</div>
                    <div class="fontclass">#icon-horn</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang12"></use>
                    </svg>
                    <div class="name">矢量智能对象12</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang12</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang14"></use>
                    </svg>
                    <div class="name">矢量智能对象14</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang14</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang15"></use>
                    </svg>
                    <div class="name">矢量智能对象15</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang15</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang21"></use>
                    </svg>
                    <div class="name">矢量智能对象21</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang21</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zuzhijiagou"></use>
                    </svg>
                    <div class="name">组织架构</div>
                    <div class="fontclass">#icon-zuzhijiagou</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caiwuguanli"></use>
                    </svg>
                    <div class="name">财务管理</div>
                    <div class="fontclass">#icon-caiwuguanli</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xingzhengguanli"></use>
                    </svg>
                    <div class="name">行政管理</div>
                    <div class="fontclass">#icon-xingzhengguanli</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-EDM"></use>
                    </svg>
                    <div class="name">企业文档</div>
                    <div class="fontclass">#icon-EDM</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-EIM"></use>
                    </svg>
                    <div class="name">企业信息管理</div>
                    <div class="fontclass">#icon-EIM</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-PM"></use>
                    </svg>
                    <div class="name">人事管理</div>
                    <div class="fontclass">#icon-PM</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-AM"></use>
                    </svg>
                    <div class="name">矢量智能对象6</div>
                    <div class="fontclass">#icon-AM</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang11"></use>
                    </svg>
                    <div class="name">矢量智能对象11</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang11</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zuojiantou"></use>
                    </svg>
                    <div class="name">左箭头</div>
                    <div class="fontclass">#icon-zuojiantou</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                    <div class="name">右箭头</div>
                    <div class="fontclass">#icon-youjiantou</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-ApTM"></use>
                    </svg>
                    <div class="name">矢量智能对象4</div>
                    <div class="fontclass">#icon-ApTM</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang1"></use>
                    </svg>
                    <div class="name">矢量智能对象1</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang91"></use>
                    </svg>
                    <div class="name">考勤管理</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang91</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang111"></use>
                    </svg>
                    <div class="name">矢量智能对象11</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang111</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shiliangzhinengduixiang3"></use>
                    </svg>
                    <div class="name">矢量智能对象3</div>
                    <div class="fontclass">#icon-shiliangzhinengduixiang3</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tianjia"></use>
                    </svg>
                    <div class="name">添加 </div>
                    <div class="fontclass">#icon-tianjia</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-chenggong"></use>
                    </svg>
                    <div class="name">成功</div>
                    <div class="fontclass">#icon-chenggong</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wujiaoxing"></use>
                    </svg>
                    <div class="name">五角星</div>
                    <div class="fontclass">#icon-wujiaoxing</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caidan1"></use>
                    </svg>
                    <div class="name">菜单</div>
                    <div class="fontclass">#icon-caidan1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-beizhu"></use>
                    </svg>
                    <div class="name">备注</div>
                    <div class="fontclass">#icon-beizhu</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icongroup07"></use>
                    </svg>
                    <div class="name">未通过</div>
                    <div class="fontclass">#icon-icongroup07</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jianzhi"></use>
                    </svg>
                    <div class="name">兼职</div>
                    <div class="fontclass">#icon-jianzhi</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhankai"></use>
                    </svg>
                    <div class="name">展开</div>
                    <div class="fontclass">#icon-zhankai</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-lingdaoren"></use>
                    </svg>
                    <div class="name">领导人</div>
                    <div class="fontclass">#icon-lingdaoren</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-lingdaoren-copy"></use>
                    </svg>
                    <div class="name">领导人</div>
                    <div class="fontclass">#icon-lingdaoren-copy</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiantou-copy-copy"></use>
                    </svg>
                    <div class="name">箭头</div>
                    <div class="fontclass">#icon-jiantou-copy-copy</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fangda"></use>
                    </svg>
                    <div class="name">放大</div>
                    <div class="fontclass">#icon-fangda</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-test-copy"></use>
                    </svg>
                    <div class="name">3</div>
                    <div class="fontclass">#icon-icon-test-copy</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-test-copy1"></use>
                    </svg>
                    <div class="name">1</div>
                    <div class="fontclass">#icon-icon-test-copy1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-test-copy2"></use>
                    </svg>
                    <div class="name">2</div>
                    <div class="fontclass">#icon-icon-test-copy2</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-success1"></use>
                    </svg>
                    <div class="name">success</div>
                    <div class="fontclass">#icon-success1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-eyes1"></use>
                    </svg>
                    <div class="name">eyes</div>
                    <div class="fontclass">#icon-eyes1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cha"></use>
                    </svg>
                    <div class="name">cha</div>
                    <div class="fontclass">#icon-cha</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-success2"></use>
                    </svg>
                    <div class="name">success</div>
                    <div class="fontclass">#icon-success2</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fail"></use>
                    </svg>
                    <div class="name">fail</div>
                    <div class="fontclass">#icon-fail</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-add"></use>
                    </svg>
                    <div class="name">add</div>
                    <div class="fontclass">#icon-add</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cancel"></use>
                    </svg>
                    <div class="name">cancel</div>
                    <div class="fontclass">#icon-cancel</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-search"></use>
                    </svg>
                    <div class="name">search</div>
                    <div class="fontclass">#icon-search</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gongsi"></use>
                    </svg>
                    <div class="name">公司</div>
                    <div class="fontclass">#icon-gongsi</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-geren"></use>
                    </svg>
                    <div class="name">个人</div>
                    <div class="fontclass">#icon-geren</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bumen"></use>
                    </svg>
                    <div class="name">部门</div>
                    <div class="fontclass">#icon-bumen</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-kong"></use>
                    </svg>
                    <div class="name">kong</div>
                    <div class="fontclass">#icon-kong</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-ppt"></use>
                    </svg>
                    <div class="name">ppt</div>
                    <div class="fontclass">#icon-ppt</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xls"></use>
                    </svg>
                    <div class="name">xls</div>
                    <div class="fontclass">#icon-xls</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-word"></use>
                    </svg>
                    <div class="name">word</div>
                    <div class="fontclass">#icon-word</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiazaieps"></use>
                    </svg>
                    <div class="name">下载 (2).eps</div>
                    <div class="fontclass">#icon-xiazaieps</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cancel1"></use>
                    </svg>
                    <div class="name">cancel</div>
                    <div class="fontclass">#icon-cancel1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bianji"></use>
                    </svg>
                    <div class="name">1编辑</div>
                    <div class="fontclass">#icon-bianji</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gengxin"></use>
                    </svg>
                    <div class="name">更新</div>
                    <div class="fontclass">#icon-gengxin</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-qita"></use>
                    </svg>
                    <div class="name">其他</div>
                    <div class="fontclass">#icon-qita</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zip"></use>
                    </svg>
                    <div class="name">zip</div>
                    <div class="fontclass">#icon-zip</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yinle"></use>
                    </svg>
                    <div class="name">音乐</div>
                    <div class="fontclass">#icon-yinle</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-moren"></use>
                    </svg>
                    <div class="name">moren</div>
                    <div class="fontclass">#icon-moren</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-video"></use>
                    </svg>
                    <div class="name">video</div>
                    <div class="fontclass">#icon-video</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-chuanshu"></use>
                    </svg>
                    <div class="name">传输  (1)</div>
                    <div class="fontclass">#icon-chuanshu</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-checksmall"></use>
                    </svg>
                    <div class="name">checksmall</div>
                    <div class="fontclass">#icon-checksmall</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-danxuan-weixuanzhong"></use>
                    </svg>
                    <div class="name">单选-未选中</div>
                    <div class="fontclass">#icon-danxuan-weixuanzhong</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-danxuan-xuanzhong"></use>
                    </svg>
                    <div class="name">单选-选中</div>
                    <div class="fontclass">#icon-danxuan-xuanzhong</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-danxuan-weixuanzhong1"></use>
                    </svg>
                    <div class="name">单选-未选中</div>
                    <div class="fontclass">#icon-danxuan-weixuanzhong1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-danxuan-xuanzhong1"></use>
                    </svg>
                    <div class="name">单选-选中</div>
                    <div class="fontclass">#icon-danxuan-xuanzhong1</div>
                </li>

                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-chakanxiangqing"></use>
                    </svg>
                    <div class="name">查看详情</div>
                    <div class="fontclass">#icon-chakanxiangqing</div>
                </li>

        </ul>

    </div>
  </div>

</template>

<script>
import icons from './generateIconsView'
import clipboard from '@/utils/clipboard'

export default {
  name: 'icons',
  data() {
    return {
      iconsMap: []
    }
  },
  mounted() {
    const iconsMap = icons.state.iconsMap.map(i => {
      return i.default.id.split('-')[1]
    })
    this.iconsMap = iconsMap
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icons-container {
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 24px;
    margin-top: 10px;
  }
  .disabled {
    pointer-events: none;
  }
}

.main.markdown{
  .icon_lists{
    li{
      width: 200px;
      height: 130px;
      float: left;
      display: block;
      .icon{
        font-size: 40px;
        display: block;
        margin: 0 auto;
        &:hover{
        font-size: 50px;

        }
      }
      .name{
        text-align: center
      }
      .fontclass{
        text-align: center
      }
    }
  }

}
</style>
