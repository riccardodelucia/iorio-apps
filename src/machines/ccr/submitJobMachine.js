import { createMachine, assign } from "xstate";
import CcrAPI from "@/api/ccr.js";
import { sendNotification } from "@/composables/notification.js";

const assignSubmittedJob = assign({
  submittedJob: (context, event) => {
    return event.data.data;
  },
  resultsUrl: (context, event) => {
    return `${document.location.origin}/ccr/results/${event.data.data.jobId}`;
  },
});

const resetContext = assign({
  submittedJob: () => ({}),
  resultsUrl: () => "",
});

const sendErrorNotification = (context, event) => {
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
        //entry: "resetContext",
        on: { SUBMIT: { target: "submitting", cond: "confirmSubmission" } },
      },
      submitting: {
        invoke: {
          src: (context, payload) => {
            return CcrAPI.submitJob(payload);
          },
          // resolved promise
          onDone: {
            target: "submitted",
            actions: ["assignSubmittedJob", "sendSuccessNotification"],
          },
          // rejected promise
          onError: {
            target: "idle",
            actions: "sendErrorNotification",
          },
        },
      },
      submitted: {
        on: { NEWJOB: { target: "idle" } },
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
