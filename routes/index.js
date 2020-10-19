const router = require("koa-router")();
const spiderCtrl = require("../app/controller/spider");

router.get("/", async (ctx, next) => {
	await ctx.render("index", {
		title: "Hello NS!",
	});
});

router.get("/spider", async (ctx, next) => {
    // 获取资源栏文章
    // let query = ctx.query||{};
    // let filePath = query.filePath||'';
    // 获取数据
    let res = await spiderCtrl.work();
	ctx.body = res;
});

module.exports = router;
