import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/subject", async (req, res) => {
  try {
    const subjects = req.body;
    const newSubjects = await prisma.subject.createMany({
      data: subjects,
      skipDuplicates: true,
    });
    res.status(200).send(newSubjects);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "subject create" });
  }
});

app.post("/post", async (req, res) => {
  try {
    const posts = req.body;
    const newPosts = await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });
    res.status(200).send(newPosts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "post create" });
  }
});

app.get("/subject", async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        disabled: false,
      },
    });
    res.status(200).send(subjects);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "subject findMany" });
  }
});

app.get("/post", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        subject: {
          select: {
            name: true,
            teacherName: true,
          },
        },
      },
      where: {
        subject: {
          disabled: false,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.status(200).send(posts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "posts findMany" });
  }
});

app.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        status,
      },
    });
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "posts update" });
  }
});

app.listen(7592, () => console.log("Server running on port 7592"));
