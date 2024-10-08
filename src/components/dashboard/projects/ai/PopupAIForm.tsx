'use client';
import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Select from "react-select";

import { getTopics } from "@/actions";
import { ITopic } from "@/interfaces";
import { getToken } from "@/utils/authHelpers";
import { SuccessfullMessage } from "./SuccessfullMessage";
import { FailedMessage } from "./FailedMessage";

// Input types for create random tasks
export type AIFormInputs = {
  quantity: number;
  topicId: string;
};

// Add zod resolver for form validation
const schema = z.object({
  quantity: z.number().int().min(1, "Please select a quantity"),
  topicId: z.string().min(1, "Please select a topic"),
});

interface Props {
  handleCreateRandomTasks: (data: AIFormInputs) => Promise<void>;
}

export const PopupAIForm = ({ handleCreateRandomTasks }: Props) => {
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setValue
  } = useForm<AIFormInputs>({
    mode: "onTouched",
    resolver: zodResolver(schema)

  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    getTopics(getToken() || "")
      .then(topics => {
        console.log(topics)
        setTopics(topics);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = async (data: AIFormInputs) => {
    // Generate random tasks
    try {
      await handleCreateRandomTasks(data);
      setIsSuccess(true);
      setMessage("Tasks generated successfully");
      reset();
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setMessage("Client Error. Please check the console.log for more info");
      reset();
    }
  };

  if (!isSubmitSuccessful) {
    return (
      <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label htmlFor="task-topics" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Topics</label>
          <Select
            className='mt-1 text-black'
            inputId='task-topics'
            options={topics.map((topic) => ({ label: topic.title, value: topic.id }))}
            onChange={(selected) => setValue('topicId', selected!.value)}
            required
          />
          {errors.topicId && (
            <div className="mt-1 text-sm text-red-400 invalid-feedback">
              {errors.topicId.message as string}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Choose the quantity of tasks you want to create
          </label>

          <Select
            inputId="quantity"
            options={[{ label: "1", value: 1 }, { label: "3", value: 3 }, { label: "5", value: 5 }]}
            className="mt-1 text-black"
            onChange={(selected) => setValue('quantity', selected!.value)}
            required
          />
          {errors.quantity && (
            <div className="mt-1 text-sm text-red-400 invalid-feedback">
              {errors.quantity.message as string}
            </div>
          )}
        </div>
        <div className="">
          <button
            type="submit"
            className="w-full mb-3 px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
          >
            {isSubmitting ? (
              <svg
                className="w-5 h-5 mx-auto text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Generate Tasks"
            )}
          </button>
          <p
            className="text-xs text-center text-gray-400"
            id="result"
          >
            <span>
              Powered with{" "}
              <a
                href="https://platform.openai.com/"
                className="text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenAI
              </a>
            </span>
          </p>
        </div>
      </form>
    )
  }

  if (isSubmitSuccessful && isSuccess) {
    return (
      <SuccessfullMessage message={message} reset={reset} />
    )
  }

  if (isSubmitSuccessful && !isSuccess) {
    return (
      <FailedMessage message={message} reset={reset} />
    )
  }

}
