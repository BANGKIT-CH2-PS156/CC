const res200 = (data, res) => {
  res.status(200).json({
    status: 200,
    message: "OK",
    data,
  });
};

const res201 = (data, res) => {
  res.status(201).json({
    status: 201,
    message: "Created",
    data,
  });
};

const res400 = (data, res) => {
  res.status(400).json({
    status: 400,
    message: "Bad Request",
    data,
  });
};

const res401 = (data, res) => {
  res.status(401).json({
    status: 401,
    message: "Unauthorized",
    data,
  });
};

const res403 = (data, res) => {
  res.status(403).json({
    status: 403,
    message: "Forbidden",
    data,
  });
};

const res404 = (data, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Found",
    data,
  });
};

const res500 = (data, res) => {
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    data,
  });
};

module.exports = {
  res200,
  res201,
  res400,
  res401,
  res403,
  res404,
  res500,
};
