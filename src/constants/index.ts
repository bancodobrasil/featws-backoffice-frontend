const getConfig = varname => {
  if (process.env.NODE_ENV === 'production') {
    return varname;
  }
  return process.env[varname.replace(/\$|\{|\}/g, '')];
};

export const API_URL = getConfig('${API_URL}');
