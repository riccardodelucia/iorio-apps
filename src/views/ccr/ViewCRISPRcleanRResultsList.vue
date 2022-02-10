<template>
  <div class="layout-ccr">
    <h2 class="u-margin-bottom-medium">Results</h2>
    <BaseDatatable :columns="columns" :rows="results">
      <template v-slot:default="slotProps">
        <td>{{ slotProps.row.dateTime }}</td>
        <td>{{ slotProps.row.email }}</td>
        <td>{{ slotProps.row.title }}</td>
        <td>
          <router-link :to="`/ccr/results/${slotProps.row.id}`">
            <BaseIcon name="eye" />
          </router-link>
        </td>
      </template>
    </BaseDatatable>
  </div>
</template>

<script>
export default {
  title: "Jobs Results",
  name: "ViewCRISPRcleanRResultsList",
  components: {},
  props: {
    results: {
      type: Array,
    },
  },
  data() {
    return {
      columns: [
        {
          width: "25%",
          label: "Submission Date",
          name: "dateTime",
        },
        { width: "35%", label: "Email", name: "email" },
        { width: "35%", label: "Title", name: "title" },
        { width: "5%", label: "Actions", name: "actions", isSortable: false },
      ],
      perPage: ["10", "20", "30"],

      pagination: {
        lastPage: "",
        currentPage: "",
        total: "",
        lastPageUrl: "",
        nextPageUrl: "",
        prevPageUrl: "",
        from: "",
        to: "",
      },
    };
  },
  methods: {
    configPagination(data) {
      this.pagination.lastPage = data.last_page;
      this.pagination.currentPage = data.current_page;
      this.pagination.total = data.total;
      this.pagination.lastPageUrl = data.last_page_url;
      this.pagination.nextPageUrl = data.next_page_url;
      this.pagination.prevPageUrl = data.prev_page_url;
      this.pagination.from = data.from;
      this.pagination.to = data.to;
    },
  },
};
</script>

<style lang="scss" scoped>
.ccr-job-list {
  grid-column: 3 / -3;
}
// Main styles
.search {
  margin: 2em auto;
}
</style>
