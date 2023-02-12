import avatar from "../../assets/img/user-icon.png";
import {Avatar} from "antd";

export default function SidenavHeader() {
  return (
    <div className="bg-gray-900 flex items-center justify-center mb-6 pb-6 pt-3 sticky top-0 z-10">
        <Avatar src={avatar} size="large" />
    </div>
  );
}
