const router = require("koa-router")();
const nsSpiderCtrl = require("../app/controller/ns/spider");
const bookSpiderCtrl = require("../app/controller/book/spider");
const bookApiCtrl = require("../app/controller/book/api");

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

router.get("/api/book", async (ctx, next) => {
    // 获取数据库数据-book
    let res = await bookApiCtrl.book();
	ctx.body = res;
});

router.get("/api/chapter/list", async (ctx, next) => {
    // 获取数据库数据-书籍章节目录
    let query = ctx.query||{};
    let bookId = query.bookId||'';
    let res = await bookApiCtrl.chapterList(bookId);
	ctx.body = res;
});

router.get("/api/chapter/details", async (ctx, next) => {
    // 获取数据库数据-书籍章节内容
    let query = ctx.query||{};
    let chapterId = query.chapterId||'';
    let res = await bookApiCtrl.chapterDetails(chapterId);
	ctx.body = res;
});

module.exports = router;
