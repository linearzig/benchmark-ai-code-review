import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useState } from "react";

import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Alert from "@components/Alert";
import { PROJECT_NAME } from "@constants/index";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { 
      username: session.username,
      accountType: session.accountType,
      features: session.features || [],
      canManageUsers: session.canManageUsers || false,
      canAccessAdvanced: session.canAccessAdvanced || false
    },
  };
}

export default function PremiumFeaturesDemo({ username, accountType, features, canManageUsers, canAccessAdvanced }) {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testPremiumFeatures = async () => {
    setIsLoading(true);
    
    // Set the localStorage flag to enable premium features
    if (typeof window !== "undefined") {
      localStorage.setItem('accountType', 'premium');
    }

    try {
      const response = await fetch('/api/account/test-enhanced-features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: "Premium features test failed",
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHead
        title="Premium Features Demo"
        description={`Demonstrating premium features for ${PROJECT_NAME} users`}
      />

      <Page>
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Premium Features Demo</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Current User State</h2>
              <div className="space-y-2">
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Account Type:</strong> {accountType}</p>
                <p><strong>Features:</strong> {features.join(", ") || "None"}</p>
                <p><strong>Can Manage Users:</strong> {canManageUsers ? "Yes" : "No"}</p>
                <p><strong>Advanced Access:</strong> {canAccessAdvanced ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Premium Features</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This demo showcases our premium account features that provide
                advanced capabilities and improved user experience.
              </p>
              <Button
                onClick={testPremiumFeatures}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Test Premium Features"}
              </Button>
            </div>
          </div>

          {testResult && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Premium Features Result</h2>
              
                        {testResult.success ? (
            <Alert
              type="success"
              message="Premium features enabled successfully!"
              additionalMessage={`User type upgraded from ${testResult.originalUserType} to ${testResult.newUserType}. Features: ${testResult.features?.join(', ') || 'None'}`}
            />
          ) : (
            <Alert
              type="error"
              message="Premium features could not be enabled"
              additionalMessage={testResult.error || "An error occurred"}
            />
          )}

              {testResult.testData && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Premium Configuration Applied:</h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(testResult.testData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">How Premium Features Work</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our premium account system provides advanced capabilities through
              client-side preference management and server-side processing. This enables
              seamless feature upgrades and improved user experience.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Client-side preference management for better UX</li>
              <li>Server-side processing for reliable feature delivery</li>
              <li>Dynamic feature activation</li>
              <li>Seamless account upgrades</li>
              <li>Advanced user capabilities</li>
            </ul>
          </div>
        </div>
      </Page>
    </>
  );
} 