const apiRequest = async (url = "", optionObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionObj);
    if (!response.ok) throw Error("error occoured during request");
    return response;
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
