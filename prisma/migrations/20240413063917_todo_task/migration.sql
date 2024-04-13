-- CreateTable
CREATE TABLE "ToDoTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdOn" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ToDoTask_title_key" ON "ToDoTask"("title");
