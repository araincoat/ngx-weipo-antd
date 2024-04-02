import { MockErrorResponse, MockRequest } from "@ngx-weipo/mock";

export const ACCOUNTS = {
  "POST https://localhost:44375/connect/token": (req: MockRequest) => {
    let username = req.body.updates.find((item: { param: string; }) => item.param === 'username').value;
    let password = req.body.updates.find((item: { param: string; }) => item.param === 'password').value;
    if (username == "admin" && password == "1q2w3E*") {
      return {
        "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJBMzIwM0U1ODQ3QTk1MkVFQzExMTE4RDhCMzA0N0Q4Mzc0M0QyNjEiLCJ4NXQiOiJLaklENVlSNmxTN3NFUkdOaXpCSDJEZEQwbUUiLCJ0eXAiOiJhdCtqd3QifQ.ew0KICAic3ViIjogImJlZTk4ODk1LTAxNWEtMmYzZS01ZDRjLTNhMGYzNjdjYjk3NCIsDQogICJ1bmlxdWVfbmFtZSI6ICJhZG1pbiIsDQogICJvaV9wcnN0IjogIkJvb2tTdG9yZV9BcHAiLA0KICAib2lfYXVfaWQiOiAiYTUzZTNmZTItOGQ3My1jMDYwLTc0OWEtM2EwZjhkODdmYjY2IiwNCiAgInByZWZlcnJlZF91c2VybmFtZSI6ICJhZG1pbiIsDQogICJnaXZlbl9uYW1lIjogImFkbWluIiwNCiAgInJvbGUiOiAiYWRtaW4iLA0KICAiZW1haWwiOiAiYWRtaW5AYWJwLmlvIiwNCiAgImVtYWlsX3ZlcmlmaWVkIjogIkZhbHNlIiwNCiAgInBob25lX251bWJlciI6ICIxMzY2NTA1MDIxMyIsDQogICJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiAiRmFsc2UiLA0KICAiY2xpZW50X2lkIjogIkJvb2tTdG9yZV9BcHAiLA0KICAib2lfdGtuX2lkIjogIjhiMWVjODdiLTg0NjAtNzE2Ny1hODc4LTNhMGY4ZGFkNmQwYyIsDQogICJhdWQiOiAiQm9va1N0b3JlIiwNCiAgInNjb3BlIjogIm9wZW5pZCBvZmZsaW5lX2FjY2VzcyBCb29rU3RvcmUiLA0KICAianRpIjogIjRhZTI5NWQxLTU4NzYtNDdmOC05NGMzLWI4ZmJlNTYzYjIxOCIsDQogICJpc3MiOiAiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNTQvIiwNCiAgImV4cCI6IDE4NjMxNTM3MTgsDQogICJpYXQiOiAxNzAyODc5MDczDQp9.Q3sEtkxiWJL15opJRKoC_ms8waUL5xpHEOdb6gUcGtvKx_d3HFOI-uYyKHrs4PPkuLpKwnDwAf8JXYSRjo7J_CbbZYMnT-2vDKOOGVRdDyrx6JF0DLdJ1BNBXz6G4TTUTyhXYGFzL6K4_XN_zcspXIIFDy4ZPUqYX1KPpH9Y3FDykhROIHZvP7ydYz9fjQ4ypCRPhFnxJ5268_74-qmKag1NjP3YMqRA9-HMKVB0gpZeGJoptaDxoKMeIqGeKiztiZNdwjV-2ek0jpkejAuYXHcrfySpwFncxQYVliWzMYG6kjg14X5PtuBlDO6kwXsi2RZVmwu6w3KFXBw7CruLZg",
        "token_type": "Bearer",
        "expires_in": 3599,
        "refresh_token": "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJBMzlBMEFCNEU1NERFRjFBMTE0OEYwQzg4NTFEQTU3OTBFMUMzNDRCIiwidHlwIjoib2lfcmVmdCtqd3QiLCJjdHkiOiJKV1QifQ.iUikau5_p5Y9dAxq5t1LLz2Kv-O_IkG4RIpPPIs3uXgME8A6UDouONSbi0RakwQ66_4eC13yCfutPaIAD-3nRPMv1lk6ZbSmouJ4btSjUAz_Hrzkg5khxbIgguPblSa_2a-9mcNVMtI1XQw8xQ1vv7_FkbeWO4ilk8E94acbil3UKXKx_FPIYEsf02brx3mG3ZuG62omVc5r3a9MYLbu-95ksQIiGdQM1KDpOVeSXtM6zGeYa6iiJRa0yRHpAuRpo9NPRSzjHqQ65j1W76TAdzKpmQtFHPusXHNYQmzGd_cjmbJuWagQ0IJOCUxZHlFXSDQ8I4NDJTmPamnyI1w7BQ.XAv8ZwrkK5SgXjouUT2gSA.sFlQ7a4byKxAx-UlYkg4ll6NfFoHp3lFAuiCprdJ--As5ZaeRm0bhD0zltrI_o0CEFdMS6VckqA37uFTuuV8_Sqx3fRHeqspfJrCqvr49NJGEN8Dyuixiqi6-L47BLYznvmVrbJSh_QXmDVc_vX6ts2SselWzhYlnSe3shYySRieSJP61QUdOcAcQ3edvOis829GSh48qYWFcrC_U_VBuGG-sT6EZk-xP821lnrPtfPBYZtF9jVB-4ZyWvJZ6j2eO2crXdnN9vHv5WonYD_eNVjytxWnG4TRLp-kMhSFcK9WPgiUstZahiw9JVQTdo1b-FjY6OmqzHIha6jteTGftNL9KMIa1XKWDDQiMNqf14cfUhlmX7UWegFBw6H5oNcTWAsUxZAkoVZGQCDRw5Ad7Iee9T4CNkmnJ-fRUaLs-s1RenJ7Vwr_5XatWeghC3IOwuEsUTSEZYv29yscX1nzZfzbEQaxvX2as6oJYCyY4RUuSgiCzT7CCdQURulq6lwUlndJiG9ygpd9I3YL_QU_h0A594i5ku-ChdbHyFX08NNqWzoh4xX8oraanwECilOoOxZ0SZu4_Tdbk4CIzD5fHV6KgDpLHa1AUnPiC2l4nYJHhArhhjRFL6G7rIpcUIQVnEfMsWLw2Z2Dov6TLGJcxVtMUEPXitCFYZDrUoWFsLH_9vIFDo1KWnalyaHheFvpgmNR7uBDhnt2E6Gh7ROO8riWvtySqhxWAj_UJRzjz4Ao5fSsEznnAuym6cgjYsYRvtCwaKwKsyHCrppt7UthcST5uwnpn8eyp0ZiydKv9_Vp7m1rp-ck0cziJnJ8BKB5mvO19gU3HA_VKm7QL0uP7ohAY7B3vC0OcqbmILkjg7Tjzc-5v2ilRTGSNzCWX1CRaetJb7kqBMFWouz0D_-JAODSJYqBqshojvbHrmvQ8lKqqHKDXukub1U3YFyp0rENqwOVcb3uiGFGVN4KWc84hprazrC8JWox4sTXsMYI-FEzlMTDIm6Mqa9eyzKti1dZTYsNpApfBl21Zqlx6nC46GPEriJtNOACieHTCd_warWxDLdJMoOmqLYgtHlSZl4hgpTYSxn5HT62wypglycbMAsdacbUszhybmlH9fEzAfZ1wMcq_FXhlUTtbBdEwnhCR8z-C1dlZlHC2c6Ln0CHQl7H2ccr11CBgcKtHoOljWXLRi3I6vBZqVIy0q0HuqbqgjSJT3xmLlif8ius_dssDfXBKM5yq3QE935BXt7twkmg-VD9q47kBWy0gdbT2Uz3cX6K4u5G7ESXF6OsP-ggTU8YEmw3xmsjtPfll8ve83uZXZHiU7KkgnGHR4gbJqnPSyxW5xL2ocNsVX-bB7kZO6arGEX8_8x1_mFSdo0x0NZ4cvVi8cs8-Hbha0d_Jcyej8d9n5efpEFBBENN1ZQgOr-zW7hthIMVay0VQckg1rUmCUoPGwyOy33zC1mkze4cD3ngWaDI17D0IA5YXu8SiicHRTBG7NhS5_VBKfRczWHkFTWMnx3t-a2fLb0buCoKOZWMjK7XsE5gd4pwjXb0OBVzSHTlYqCKonqldaZIb24tHL_QxYiR-UqKAOf71IzOrH3BmAGfPmaBzrAstkj1oltuC7LKtWOl8CXjx8jEC1Awx15U397jJ9nUiaKj8XCmFQabcAM_PFm-0Wxpp_D0BcjI2hb2BEtyeu39c8nYKADWFLI93L8v4UrQ3NJKfGJCexwy6avCu_9fLSfv-bMzRzUgZKsiB6wyCuKWXTZfagNMSgL7PfniqRYU9cD2ZtKUcQ-YFFb1FyzqZ_BxSLIluRlCug5yfuAQFg7h0EzZ0_d4fFnvBeqrOLD42reQ8XwWcDNaKyZkf-aGVT4xQAWabmDhjtqBZgWyuZqVIwawhNGptpZd94mUH5IunmdeU3XRCV_jsFCOXtVIfZ29FrdxuXC9y1IqvYTYbtcghbDLusihETxIBjOjRack4kgQ6Z--F_nCFkN7REyGgB1ULqh55vKA2D5cJz8JWifv4wnxi7rthM1k_1EeUdtd1QvDPcFrQc5xfbnbgS6f82NRapOESMtg_g5XqbeWhF4Xf4IccLnXxRwJ6XWznaZsryrqeUaZX2Et2HupGCFGxWhSIfhw5y-WZzGhGQIv0NZfHt5MSe4jCcK8Mjl_Xqe3wUVP0L7UCuJEYv4GRVjkroMxf36aw0FYefBGhsBcLehHHQ6xeugmIAGy-_ODzolwTNyo9AT3SszRcqhz7PdW9BwK0iB9H1AxPisVx9FatqlqRxXCRs4SmLEpURMVYf7D3wPOWT_4.OUjo5ilJ-frntg8Bq76cZRjmANp6fdVHjh-1AwvSZVk"
      };
    }
    else {
      throw new MockErrorResponse(401, {
        error_description: "用户名或密码错误"
      })
    }
  }
}