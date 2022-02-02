import { createMachine, assign } from "xstate";
import CcrAPI from "@/api/ccr.js";
import { sendNotification } from "@/composables/notification.js";

const assignSubmittedJob = assign({
  submittedJob: (context, event) => {
    return event.data.data;
  },
});

const resetContext = assign({
  submittedJob: () => ({}),
  resultsUrl: () => "",
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
    message: `Job Submitted! Please find your results here: ${document.location.origin}/ccr/results/${context.submittedJob.id}`,
  });
};

export const submitJobMachine = createMachine(
  {
    id: "submitJob",
    context: {
      submittedJob: {},
    },
    initial: "idle",
    states: {
      idle: {
        entry: "resetContext",
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
