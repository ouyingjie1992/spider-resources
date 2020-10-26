const router = require("koa-router")();
const nsSpiderCtrl = require("../app/controller/ns/spider");
const bookSpiderCtrl = require("../app/controller/book/spider");

router.get("/", async (ctx, next) => {
	await ctx.render("index", {
		title: "Hello spider!",
	});
});

router.get("/ns/spider", async (ctx, next) => {
    // 获取数据-ns
    let res = await nsSpiderCtrl.work();
	ctx.body = res;
});

router.get("/book/spider", async (ctx, next) => {
    // 获取数据-book
    let res = await bookSpiderCtrl.work();
	ctx.body = res;
});

module.exports = router;
