"use client";

import { useEffect, useState } from "react";
import { getItems, deleteItem, addItem } from "../lib/indexeddb";
import { Button, DatePicker, DatePickerProps, Input, Radio } from "antd";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import useAppContext from "@/components/Context/UseAppContext";
import TextArea from "antd/es/input/TextArea";

export default function Page() {
  const [data, setData] = useState("");
  const [items, setItems] = useState<ItemDataList[]>([]);
  // const [selectedId, setSelectedId] = useState(null);
  const { newTask, setNewTask } = useAppContext();
  console.log(newTask);
  useEffect(() => {
    if (typeof window !== "undefined") {
      getItems().then((storedItems) => {
        setItems(storedItems);
      });
    }
  }, []);

  const handleSave = async () => {
    if (data.trim()) {
      await addItem({ value: data });
      const updatedItems = await getItems();
      setItems(updatedItems);
      setData("");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    const updatedItems = await getItems();
    setItems(updatedItems);
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex justify-center flex-col  mt-10 my-auto">
      <div className="p-1">
        <div className="text-lg font-bold text-center">کار های امروز</div>
        <div className="text-[18px] text-gray-400 mt-5 font-bold"> امروز</div>
      </div>
      <div className="w-11/12 text-center mt-10  min-h-[300px] mx-auto  rounded-sm ">
        <h2>لیست تسک ها</h2>
        <ul className="w-full">
          {items?.map((item: ItemDataList, index: number) => (
            <li
              key={index}
              className="flex justify-between bg-blue-300 bg-opacity-40 mb-1 rounded-lg p-5"
            >
              <span className="overflow-auto"> {item.value}</span>
              <Button
                className="bg-red-600 text-white"
                onClick={() => handleDelete(item?.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>

        <AnimatePresence mode="popLayout">
          {newTask && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 800, opacity: 0 }}
              className="w-11/12 h-[550px]     bg-blue-200 absolute bottom-0 top-0 my-auto z-20 right-0 left-0 mx-auto rounded-xl"
            >
              <label className="w-1/4" htmlFor="title">
                عنوان تسک
              </label>
              <Input
                id="title"
                name="title"
                autoFocus
                placeholder="عنوان تسک"
                className="w-3/4 h-11 mt-5 "
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <label className="w-1/4" htmlFor="title">
                تاریخ تسک
              </label>
              <DatePicker
                onChange={onChange}
                className="w-3/4 h-11 mt-5 mb-5"
              />

              <label className=" " htmlFor="title">
                توضیح تسک
              </label>
              <TextArea rows={5} className="w-[96%]" />

              <label className="w-full" htmlFor="title">
                اولویت تسک
              </label>
              <Radio.Group className="w-full" defaultValue="a">
                <Radio.Button value="a">اولویت یک</Radio.Button>
                <Radio.Button value="b">اولویت دو</Radio.Button>
                <Radio.Button value="c">اولویت سه</Radio.Button>
              </Radio.Group>

              <motion.div className="flex justify-center gap-4 p-2  absolute bottom-5 right-0 left-0 ">
                <Button
                  className="w-2/4 bg-green-600 font-bold text-[16px]"
                  type="primary"
                  title="click"
                  onClick={handleSave}
                >
                  ثبت
                </Button>
                <Button
                  className="bg-red-700 text-white w-2/4 font-bold text-[16px]"
                  title="click"
                  onClick={() => setNewTask(false)}
                >
                  لغو کردن
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
