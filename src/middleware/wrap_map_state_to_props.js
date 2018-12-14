export default function wrapMapStateToProps(name) {
  return state => {
    return {
      appName: name,
      payload: state[name]
    };
  };
}