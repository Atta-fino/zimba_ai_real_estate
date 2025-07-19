import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "./index.ts";

Deno.test("it should return a 200 status and a success message for a valid request", async () => {
  const request = await superoak(app);
  await request.post("/")
    .set("Content-Type", "application/json")
    .send({
      user_id: "a-user-id",
      id_image_url: "https://example.com/id.jpg",
      biometric_data: "https://example.com/biometric.jpg",
      metadata: {
        ip_address: {
          country: "GH"
        },
        gps_location: {
          country: "GH"
        }
      }
    })
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect((res) => {
      if (res.body.status !== "approved") {
        throw new Error("Expected status to be approved");
      }
    });
});
