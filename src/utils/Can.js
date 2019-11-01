import rules from "./rbac-rules";

const check = (rules, role, action, data) => {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  console.log("Action",action);
  
["hello"]
  const staticPermissions = permissions.permission;
 
  console.log(staticPermissions.includes(String(action)));
  
  if (staticPermissions && staticPermissions.includes(String(action))) {
    // static rule not provided for action
    return true;
  }

  return false;
};

const Can = props =>
  check(rules, props.role, props.perform, props.data)
    ? (props.children ? props.children: props.yes())
    : props.no();
    

// Can.defaultProps = {
//   yes: () => null,
//   no: () => null
// };

export default Can;