import React from "react";
import { connect } from "dva";
import cookie from "react-cookies";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import LoockStudentList from "@/components/Module/LoockStudentList/LoockStudentList";

@connect(({ stageManage, loading }) => ({
  stageManage: stageManage
}))
export default class Stage1GtoupPerson extends React.Component {
  state = {
    loading: false
  };
  componentDidMount() {
    let username = cookie.load("currentUser").admin;
    this.props.dispatch({
      type: "stageManage/groupStudentList",
      payload: {
        username,
        id: this.props.match.params.id
      },
      callback: res => {
        if (res.status === 1) {
          this.setState({
            loading: true
          });
        }
        console.log(res);
      }
    });
  }
  render() {
    const id = this.props.match.params.id;
    console.log(this.props);
    return (
      <PageHeaderWrapper>
        {this.state.loading && <LoockStudentList id={id} />}
      </PageHeaderWrapper>
    );
  }
}
