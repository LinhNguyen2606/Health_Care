import express from "express";

let configViewEngine = (app) => {
	//statis helps express bik only get map images or something on public files
	app.use(express.static("./src/public"));
	//ejs help you can write logic command in file html
	app.set("view engine", "ejs");
	app.set("views", "./src/views");
};

module.exports = configViewEngine;
