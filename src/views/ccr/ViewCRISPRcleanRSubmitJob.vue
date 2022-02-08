<template>
  <BaseLayoutApp>
    <div class="layout-ccr">
      <h2 class="u-margin-bottom-small">Submit a new job</h2>
      <FormFill
        class="ccr-form"
        v-if="currentState === 'idle'"
        @nav="updateService($event)"
        :config="$route.params.config"
      />
      <p v-else-if="currentState === 'submitting'">Submitting...</p>
    </div>
  </BaseLayoutApp>
</template>

<script>
import { interpret } from "xstate";
import { submitJobMachine } from "@/machines/ccr/submitJobMachine.js";
import FormFill from "@/components/ccr/FormFill.vue";
export default {
  title: "Submit New Job",
  name: "ViewCRISPRcleanRSubmitJob",
  components: {
    FormFill,
  },
  created() {
    // Start service on component creation
    this.submitJobService
      .onTransition((state) => {
        // Update the current state component data property with the next state
        this.currentState = state.value;
        // Update the context component data property with the updated context
        this.context = state.context;
      })
      .start();
  },
  computed: {
    jobResultsUrl() {
      return `${this.context.resultsUrl}${this.context.submittedJob.id}`;
    },
  },
  data() {
    return {
      submitJobService: interpret(submitJobMachine),
      currentState: submitJobMachine.initialState.value,
      context: submitJobMachine.context,
    };
  },
  methods: {
    updateService({ event, payload = undefined }) {
      this.submitJobService.send(event, payload);
    },
  },
};
</script>

<style lang="scss" scoped></style>
