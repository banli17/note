export default () => {
  return {
    name: "transform",
    transform(code, id) {
      console.log("id", id, code);
      return code + "/** helo **/";
    },
  };
};
