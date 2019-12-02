import request, { fileDown } from "@/utils/request";

//教师模块
export async function getTeacherList(params) {
  //教师列表
  return request("entry=sys&c=adminList&a=admin&do=adminList", {
    method: "POST",
    body: params
  });
}
export async function delTeacher(params) {
  //删除教师
  console.log(params);
  return request("entry=sys&c=adminList&a=admin&do=delete", {
    method: "POST",
    body: params,
    isForm: true
  });
}

export async function tyepList(params) {
  //角色类型
  console.log(params);
  return request("entry=sys&c=adminList&a=admin&do=getRole", {
    method: "POST",
    body: params
  });
}

export async function teacherDetail(params) {
  //教师详情
  console.log(params);
  return request("entry=sys&c=adminList&a=admin&do=roleEdit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function editPassword(params) {
  //编辑密码
  console.log(params);
  return request("entry=sys&c=adminList&a=admin&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function confirm(params) {
  //确认修改密码
  console.log(params);
  return request("entry=sys&c=adminList&a=admin&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function confirmEditUser(params) {
  //确认修改角色分配
  console.log(params);
  return request("entry=sys&c=adminList&a=admin&do=roleUpdate", {
    method: "POST",
    body: params,
    isForm: true
  });
}

//离职模块
export async function getLeaveList(params) {
  //确认修改角色分配
  return request("entry=sys&c=user&a=userManagement&do=deleteList", {
    method: "POST",
    body: params
  });
}
export async function delLeave(params) {
  //确认修改角色分配
  return request("entry=sys&c=user&a=userManagement&do=listdelete", {
    method: "POST",
    body: params,
    isForm: true
  });
}

//统计模块

//每日统计
export async function getYear(params) {
  //获取年份
  return request("entry=sys&c=group&a=value&do=year", {
    method: "POST",
    body: params
  });
}
export async function getTime(params) {
  //获取期数
  return request("entry=sys&c=group&a=value&do=batch", {
    method: "POST",
    body: params
  });
}
export async function getCity(params) {
  //获取城市
  return request("entry=sys&c=group&a=value&do=county", {
    method: "POST",
    body: params
  });
}
export async function getDayData(params) {
  //获取每日数据
  return request("entry=sys&c=group&a=screen&do=day_screen", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function exportDayData(params) {
  //获取每日数据
  console.log(params);
  return fileDown("entry=sys&c=group&a=day_screen&do=day_screen", params);
}

//阶段测试统计
export async function getGroup(params) {
  //获取分组数据
  return request("entry=sys&c=group&a=real&do=group_list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function errorTop5List(params) {
  //获取错题排行榜
  return request("entry=sys&c=group&a=record&do=errno_subjects", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function sortList(params) {
  //获取排行榜数据
  return request("entry=sys&c=group&a=real&do=realTime", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function downError(params) {
  //下载单题错误记录
  console.log(params);
  return fileDown(
    "entry=sys&c=group&a=record_export&do=subject_export",
    params
  );
}
export async function errorSelData(params) {
  //选择次数
  return request("entry=sys&c=group&a=record&do=errorRecord", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function questionDetail(params) {
  //题目选择项
  return request("entry=sys&c=column&a=record&do=record", {
    method: "POST",
    body: params,
    isForm: true
  });
}

//用户管理
export async function userList(params) {
  //用户列表
  return request("entry=sys&c=user&a=userManagement&do=userlist", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function userDetail(params) {
  //学员详情
  return request("entry=sys&c=user&a=userManagement&do=userEdit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function userUpdate(params) {
  //学员更新
  return request("entry=sys&c=user&a=userManagement&do=userUpdate", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function leaveUser(params) {
  //学员离职
  return request("entry=sys&c=user&a=userManagement&do=delete", {
    method: "POST",
    body: params,
    isForm: true
  });
}

export async function downTemplete(params) {
  //下载模板
  console.log(params);
  return fileDown("https://lem.chanel.com.cn/excel/20180724.xlsx", params);
}
export async function downAll(params) {
  //导出全部
  console.log(params);
  return fileDown("entry=sys&c=user&a=guide&do=allexport", params);
}
export async function downStage1(params) {
  //导出全部
  console.log(params);
  return fileDown("entry=sys&c=user&a=stepExple&do=export_stage1", params);
}
export async function downStage2(params) {
  //导出全部
  console.log(params);
  return fileDown("entry=sys&c=user&a=stepExple&do=export_stage2", params);
}
export async function downStage3(params) {
  //导出全部
  console.log(params);
  return fileDown("entry=sys&c=user&a=stepExple&do=export_stage3", params);
}

//培训阶段管理
//阶段1
export async function groupList(params) {
  //分组列表
  return request("entry=sys&c=teacher&a=student&do=groupList", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function groupStudentList(params) {
  //分组学员列表
  return request("entry=sys&c=teacher&a=group&do=student", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delGroupStudent(params) {
  //删除分组学员
  return request("entry=sys&c=teacher&a=group&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function allUserList(params) {
  //未分组学员列表
  return request("entry=sys&c=teacher&a=student&do=student", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function addUserToGroup(params) {
  //添加学员到分组
  return request("entry=sys&c=teacher&a=student&do=member", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function updateRenameOrStatus(params) {
  //更新组名 状态
  return request("entry=sys&c=teacher&a=student&do=status", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function deleteGroup(params) {
  //删除组
  return request("entry=sys&c=teacher&a=student&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getSignParams(params) {
  //获取签到二维码参数
  return request("entry=sys&c=generat&a=generats&do=generats", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getTestParams(params) {
  //获取考试二维码参数
  return request("entry=sys&c=generat&a=generat&do=generat", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getStageList(params) {
  //获取阶段列表
  return request("entry=sys&c=stage&a=stage&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getCode(params) {
  //获取二维码
  return request("entry=sys&c=generat&a=generat&do=show", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getSignCode(params) {
  //获取签到二维码
  return request("entry=sys&c=generat&a=generats&do=test1", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getTestCode(params) {
  //获取考试二维码
  return request("entry=sys&c=generat&a=generat&do=test", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function downStage1GroupStuden(params) {
  //导出分组学员成绩
  console.log(params);
  return fileDown("entry=sys&c=group&a=export&do=export_stage1", params);
}
//过渡期
export async function getTransitionList(params) {
  //获取过渡期分组列表
  return request("entry=sys&c=teacher1&a=student&do=groupList", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getTransitionGroupList(params) {
  //获取过渡期分组学员
  return request("entry=sys&c=teacher1&a=group&do=student", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function changeWeekStatus(params) {
  //更改学员每周状态
  return request("entry=sys&c=teacher1&a=group&do=wsign", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function changeAllow(params) {
  //更改学员每周状态
  return request("entry=sys&c=teacher1&a=group&do=adopt", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function changeAllows(params) {
  //批量通过
  return request("entry=sys&c=teacher1&a=group&do=adopts", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delTransition(params) {
  //批量通过
  return request("entry=sys&c=teacher1&a=group&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function noTransitionGroup(params) {
  //过渡期学员列表
  return request("entry=sys&c=teacher1&a=student&do=student", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function addTransitionGroup(params) {
  //分组
  return request("entry=sys&c=teacher1&a=student&do=member", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function addTransitionStatus(params) {
  //分组
  return request("entry=sys&c=teacher&a=student&do=status", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function Theme(params) {
  //stageList
  return request("entry=sys&c=stage&a=stage&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function editStage(params) {
  //编辑阶段
  return request("entry=sys&c=stage&a=stage&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delTransitionGroup(params) {
  //分组
  return request("entry=sys&c=teacher1&a=student&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function saveStage(params) {
  //保存阶段
  return request("entry=sys&c=stage&a=stage&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delStage(params) {
  //删除阶段
  return request("entry=sys&c=stage&a=stage&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}

export async function downTransition(params) {
  //导出过渡期组
  console.log(params);
  return fileDown("entry=sys&c=group&a=export&do=export_stage2", params);
}

//主题内容更改
export async function themeList(params) {
  //主题列表
  return request("entry=sys&c=schedule&a=schedule&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getThemeStageList(params) {
  //主题 阶段列表
  return request("entry=sys&c=schedule&a=schedule&do=getStage", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function getThemeDetail(params) {
  //主题 详情
  return request("entry=sys&c=schedule&a=schedule&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function uploadImage(params) {
  //上传图片
  return request("entry=sys&c=account&a=upload", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function updateTheme(params) {
  //更新主题
  return request("entry=sys&c=schedule&a=schedule&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delTheme(params) {
  //del主题
  return request("entry=sys&c=schedule&a=schedule&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function allTheme(params) {
  //allTheme
  return request("entry=sys&c=step&a=step&do=getTheme", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function saveStep(params) {
  //编辑或新增步骤
  return request("entry=sys&c=step&a=step&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function stepList(params) {
  //编辑或新增步骤
  return request("entry=sys&c=step&a=step&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function stepDetail(params) {
  //步骤详情
  return request("entry=sys&c=step&a=step&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delStep(params) {
  //步骤删除
  return request("entry=sys&c=step&a=step&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}

//typeone
export async function tyepOneList(params) {
  //列表
  return request("entry=sys&c=applicable&a=applicable&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function saveTypeOne(params) {
  //添加typeone
  return request("entry=sys&c=applicable&a=applicable&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeOneDetail(params) {
  //typeone详情
  return request("entry=sys&c=applicable&a=applicable&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}

export async function delTypeOne(params) {
  //typeone删除
  return request("entry=sys&c=applicable&a=applicable&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}

export async function delTypeTwo(params) {
  //typeone删除
  return request("entry=sys&c=browse&a=browse&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delTypeThree(params) {
  //typethree删除
  return request("entry=sys&c=watch&a=watch&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}

export async function typeTwoList(params) {
  //typeoTwo列表
  return request("entry=sys&c=browse&a=browse&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeFourList(params) {
  //typeofour列表
  return request("entry=sys&c=column&a=subjects&do=display", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeThreeList(params) {
  //typeothree列表
  return request("entry=sys&c=watch&a=watch&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeTwoSave(params) {
  //typeoTwo更新或新增
  return request("entry=sys&c=browse&a=browse&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeThreeSave(params) {
  //typeoThree更新或新增
  return request("entry=sys&c=watch&a=watch&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function addFour(params) {
  //typeofour新增
  return request("entry=sys&c=column&a=subjects&do=insert", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function updateFour(params) {
  //typeofour更新
  return request("entry=sys&c=column&a=subjects&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function fourDetail(params) {
  //typeofour详情
  return request("entry=sys&c=column&a=subjects&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeTwoDetail(params) {
  //typetwo详情
  return request("entry=sys&c=browse&a=browse&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeThreeDetail(params) {
  //typethree详情
  return request("entry=sys&c=watch&a=watch&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}

//权限
export async function authorList(params) {
  //权限list
  return request("entry=sys&c=role&a=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function authorDetail(params) {
  //权限detail
  return request("entry=sys&c=role&a=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function addAuthor(params) {
  //add权限
  return request("entry=sys&c=role&a=edit&do=add", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function updateAuthor(params) {
  //update权限
  return request("entry=sys&c=role&a=edit&do=update", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delAuthor(params) {
  //删除
  return request("entry=sys&c=role&a=list&do=delete", {
    method: "POST",
    body: params,
    isForm: true
  });
}

export async function uploadUser(params) {
  //上传用户
  return request("entry=sys&c=user&a=guide&do=Imexcel", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function submitUser(params) {
  //期数用户提交
  return request("entry=sys&a=screen&c=user&do=batch_screen", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function typeList(params) {
  //分类列表
  return request("entry=sys&c=column&a=type&do=list", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function addType(params) {
  //添加分类
  return request("entry=sys&c=column&a=type&do=increase", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function editType(params) {
  //分类编辑
  return request("entry=sys&c=column&a=type&do=edit", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function editTypeNum(params) {
  //设置区题数量
  return request("entry=sys&c=column&a=type&do=set_total", {
    method: "POST",
    body: params,
    isForm: true
  });
}
export async function delType(params) {
  //设置区题数量
  return request("entry=sys&c=column&a=type&do=del", {
    method: "POST",
    body: params,
    isForm: true
  });
}
