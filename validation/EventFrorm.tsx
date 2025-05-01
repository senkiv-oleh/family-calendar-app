import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required.")
    .min(3, "Title must be longer than 3 letters"),
  location: Yup.string().required("Location is required."),
  eventType: Yup.string().required("Event type is required."),
  startTime: Yup.string().required("Start time is required."),
  endTime: Yup.string()
    .required("End time is required.")
    .test("is-after-start", "End time must be after start time.", function(
      value
    ) {
      const { startTime } = this.parent;
      return startTime && value && startTime < value;
    })
});

