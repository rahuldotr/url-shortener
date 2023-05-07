let express = require("express");
let router = express.Router();
let Records = require("../models/record");
let error = require("../utils/global_error_handler.js");
let { registerSchema } = require("../validation/index.js");
let generate = require("../utils/generate_url");

router.get("/time", (req, res) => {
  let timestamp = new Date().getTime();
  let data = {
    status: 200,
    message: "Ok",
    data: timestamp,
  };
  res.status(200).json(data);
});

router.get("/", async function (req, res, next) {
  try {
    let records = await Records.find({});

    let data = records.map((element) => {
      return {
        id: element?.id,
        url: element?.url,
        shortened_url: element?.shortened_url,
        ip: element?.ip,
        created_at: element?.created_at,
        expire_at: element?.expire_at
      };
    });
    let response = {
      status: 200,
      message: "success",
      data: data,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    let { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details?.[0]?.message,
        data: {},
      });
    }
    let { url } = req.body;
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    let shortened_url;
    while (true) {
      shortened_url = generate.shortUrl();
      let existingRecord = await Records.findOne({
        shortened_url: shortened_url,
        expire_at: { $gt: new Date() },
      });
      if (!existingRecord) {
        break;
      }
    }
    let validity = process.env.URL_VALIDITY ?? 2;
    let expireAt = new Date(Date.now() + validity * 24 * 60 * 60 * 1000);
    let data = await Records.create({
      url,
      shortened_url,
      ip,
      created_at: Date.now(),
      expire_at: expireAt,
    });
    let filteredData = {
      id: data?.id,
      url: data?.url,
      shortened_url: data?.shortened_url,
      ip: data?.ip,
      created_at: data?.created_at,
      expire_at: data?.expire_at,
    };
    let response = {
      status: 200,
      message: "success",
      data: filteredData,
    };
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:short_url", async function (req, res, next) {
  try {
    await Records.findOne({
      shortened_url: req?.params?.short_url,
      expire_at: { $gt: new Date() },
    }).then(function (record) {
      if (!record) error.raise(404, "Invalid short url");
      else {
        res.redirect(record.url);
      }
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
