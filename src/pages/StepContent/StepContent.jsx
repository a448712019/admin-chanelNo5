import React from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import TypeOne from "@/components/TypeOne/TypeOne";
import TypeTwo from "@/components/TypeTwo/TypeTwo";
import TypeThree from "@/components/TypeThree/TypeThree";
import TypeFour from "@/components/TypeFour/TypeFour";
import Courseware from "@/components/Courseware/Courseware";
export default class StepContent extends React.Component {
  render() {
    let pathParams = this.props.match.params;
    console.log(this.props);
    console.log();
    return (
      <PageHeaderWrapper>
        {pathParams.type === "0" && <TypeOne sid={pathParams.id} />}
        {pathParams.type === "1" && <TypeTwo sid={pathParams.id} />}
        {pathParams.type === "2" && <TypeThree sid={pathParams.id} />}
        {pathParams.type === "3" && <TypeFour sid={pathParams.id} />}
        {pathParams.type === "4" && <Courseware sid={pathParams.id} />}
      </PageHeaderWrapper>
    );
  }
}
