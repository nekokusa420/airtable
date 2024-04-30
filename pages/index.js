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
  const form = useForm({
    initialValues: {
      id: "",
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
    form.setvalues({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleUpdate = async (values) => {
    const request = await fetch("/api/update", {
      method: "PATCH",
      body: JSON.stringify(values),
    });

    // Handle the response...
  };

  const handleDelete = async (values) => {
    const request = await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({ id: values.id }),
    });

    // Handle the response...
  };

  return (
    <Container size={200} px={0} mt="xl">
      <Box mt="xl">
        <form>
          <TextInput
            label="ID"
            placeholder="Enter record ID"
            {...form.getInputProps("id")}
          />
          <TextInput
            required
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
          <TextInput
            required
            label="Name"
            placeholder="Enter your name"
            {...form.getInputProps("name")}
          />
          <Textarea
            required
            label="Message"
            placeholder="Enter your message"
            {...form.getInputProps("message")}
          />
          <Group position="right" mt="md">
            <Button
              onClick={form.onSubmit((values) => handleUpdate(values))}
              color="green"
            >
              Update
            </Button>
            <Button
              onClick={form.onSubmit((values) => handleDelete(values))}
              color="red"
            >
              Delete
            </Button>
            <Button
              onClick={form.onSubmit((values) => handleSubmit(values))}
              color="blue"
            >
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}
