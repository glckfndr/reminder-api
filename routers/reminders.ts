import { Router } from "express";
import CreateReminderDto from "../dtos/create-reminder";
import Reminder from "../models/reminder";

const router = Router();
const reminders: Reminder[] = [];

router.get("/", (req, res) => {
  res.json(reminders);
});

router.get("/:id", (req, res) => {
  const index = parseInt(req.params.id);
  if (index < reminders.length) res.status(200).json(reminders[index]);
  else res.status(400).json({ error: "not found" });
});

router.delete("/:id", (req, res) => {
  const index = parseInt(req.params.id);
  const el = reminders.find((el) => el.id === index);
  if (el) {
    const ind = reminders.indexOf(el);
    reminders.splice(ind, 1);
    res.json(reminders);
  } else {
    res.status(400).json({ error: "Deleted object is not found" });
  }
});

router.patch("/:id", (req, res) => {
  const index = parseInt(req.params.id);
  const el = reminders.find((el) => el.id === index);
  if (el) {
    const ind = reminders.indexOf(el);
    const { isComplete } = req.body as Reminder;
    reminders[ind].isComplete = isComplete;
    res.json(reminders);
  } else {
    res.status(400).json({ error: "Patched object is not found" });
  }
});

router.post("/", (req, res) => {
  const { title } = req.body as CreateReminderDto;
  reminders.push(new Reminder(title));
  res.status(201).json(reminders[reminders.length - 1]);
});

export default router;
