import {
  TextInput,
  Textarea,
  Button,
  Container,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

export default function Home() {
  const submitForm = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: {
      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : "Invalid email";
      },
    },
  });

  const handleSubmit = async (values) => {
    const request = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const result = await request.json();

    if (result.data !== "ok") {
      showNotification({
        title: "Error submitting form",
        color: "red",
        message: "Please try again later",
      });
      return;
    }
    showNotification({
      title: "Form submitted",
      color: "green",
      message: "We will contact you soon",
    });
    submitForm.setvalues({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Container size={200} px={0} mt="xl">
      <Box mt="xl">
        <form onSubmit={submitForm.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            required
            label="Email"
            placeholder="Enter your email"
            {...submitForm.getInputProps("email")}
          />
          <TextInput
            required
            label="Name"
            placeholder="Enter your name"
            {...submitForm.getInputProps("name")}
          />
          <Textarea
            required
            label="Message"
            placeholder="Enter your message"
            {...submitForm.getInputProps("message")}
          />
          <Group position="right" mt="md">
            <Button type="submit" color="blue">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}
