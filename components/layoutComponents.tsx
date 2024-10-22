"use client";
import {
  HomeOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import useAppContext from "./Context/UseAppContext";

const LayoutComponents = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { newTask, setNewTask } = useAppContext();
  const [instalPrompt, setInstalPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: Event) => {
      e.preventDefault();
      setInstalPrompt(e as BeforeInstallPromptEvent);
    });
  });

  console.log(instalPrompt, "install");
  return (
    <>
      {instalPrompt && (
        <div>
          <span>برنامه را نصب کنید</span>
          <button onClick={() => instalPrompt.prompt()}>نصب برنامه </button>
        </div>
      )}
      <Layout dir="rtl" className=" h-dvh rtl">
        <Content className="bg-white"> {children}</Content>
        <div className="shadow-xl border  rounded-t fixed flex justify-between bottom-0 w-full h-16 p-4">
          <UnorderedListOutlined className="text-[40px]  text-blue-600" />
          <div
            onClick={() => {
              setNewTask(true);
            }}
            className=" text-center py-2 mx-auto absolute -top-8 right-0 left-0 w-[60px] h-[60px] rounded-full bg-blue-500  "
          >
            <PlusOutlined className="text-[40px]  text-white" />
          </div>
          <HomeOutlined className="text-[40px]  text-blue-600" />
        </div>
      </Layout>
    </>
  );
};

export default LayoutComponents;
