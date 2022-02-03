import { createMachine, assign } from "xstate";
import CcrAPI from "@/api/ccr.js";
import { sendNotification } from "@/composables/notification.js";

const assignSubmittedJob = assign({
  submittedJob: (context, event) => {
    return event.data.data;
  },
  resultsUrl: (context, event) => {
    return `${document.location.origin}/ccr/results/${event.data.data.id}`;
  },
});

const resetContext = assign({
  submittedJob: () => ({}),
});

const sendErrorNotification = (context, event) => {
  console.log("sendErrorNotification: ", context);

  sendNotification({
    type: "error",
    message: "Error during form submission: " + event.data.message,
    timeout: 5,
  });
};

const sendSuccessNotification = (context) => {
  sendNotification({
    type: "success",
    message: `Job Submitted! Please find your results here: ${context.resultsUrl}`,
  });
};

export const submitJobMachine = createMachine(
  {
    id: "submitJob",
    context: {
      submittedJob: {},
      resultsUrl: "",
    },
    initial: "idle",
    states: {
      idle: {
        //entry: "resetContext", // if enabled, send success notification reads an undefined id...
        on: { SUBMIT: { target: "submitting", cond: "confirmSubmission" } },
      },
      submitting: {
        invoke: {
          src: (context, payload) => {
            return CcrAPI.submitJob(payload);
          },
          // resolved promise
          onDone: {
            target: "success",
            actions: "assignSubmittedJob",
          },
          // rejected promise
          onError: {
            target: "error",
          },
        },
      },
      success: {
        entry: "sendSuccessNotification",
        always: { target: "idle" },
      },
      error: {
        entry: "sendErrorNotification",
        always: { target: "idle" },
      },
    },
  },
  {
    guards: {
      confirmSubmission: () =>
        window.confirm("Do you want to submit this job?"),
    },
    actions: {
      assignSubmittedJob,
      resetContext,
      sendErrorNotification,
      sendSuccessNotification,
    },
  }
);
