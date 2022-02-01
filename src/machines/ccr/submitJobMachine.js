import { Machine, assign } from "xstate";
import CcrAPI from "@/api/ccr.js";

const assignSubmittedJob = assign({
  submittedJob: (context, event) => {
    return event.data.data;
  },
});

const resetContext = assign({
  submittedJob: () => ({}),
});

export const submitJobMachine = Machine(
  {
    id: "submitJob",
    context: {
      submittedJob: {},
      resultsUrl: `${document.location.origin}/ccr/results/`,
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
            target: "submitted",
            actions: "assignSubmittedJob",
          },
          // rejected promise
          onError: {
            target: "error",
          },
        },
      },
      error: {
        on: { NEWJOB: { target: "idle" } },
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
    },
  }
);
