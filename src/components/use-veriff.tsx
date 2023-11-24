"use client";

import { useCallback } from "react";
import { ofetch } from "ofetch";
import { createVeriffFrame } from "@veriff/incontext-sdk";

import { env } from "@/env";

type VeriffSessionResponse = {
  verification: {
    url: string;
  };
};

export default function useVeriff() {
  const createSession = useCallback(
    async (data: {
      firstName: string;
      lastName: string;
      idNumber?: string;
      vendorData: string;
    }) => {
      const res = await ofetch<VeriffSessionResponse>("/v1/sessions", {
        baseURL: "https://api.veriff.me",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-client": env.NEXT_PUBLIC_VERIFF_API_KEY,
          "x-origin": "VANXH",
        },
        body: {
          verification: {
            // callback: "https://vanxh.dev/veriff-callback",
            person: {
              firstName: data.firstName,
              lastName: data.lastName,
              idNumber: data.idNumber,
            },
            vendorData: data.vendorData,
            timestamp: new Date().toISOString(),
          },
        },
        parseResponse: JSON.parse,
      });

      // window.location.href = res.verification.url;
      createVeriffFrame({ url: res.verification.url });
    },
    [],
  );

  return {
    createSession,
  };
}
