import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe("App", () => {
    const testToken = "testToken";
    const testProjectId = "testProjectId";

    it("renders App component", () => {
        render(<App />);
        expect(screen.getByText("Logg inn")).toBeInTheDocument();
        // insert token and project id
        fireEvent.change(screen.getByPlaceholderText("Token"), { target: { value: testToken } });
        fireEvent.change(screen.getByPlaceholderText("Prosjekt ID"), { target: { value: testProjectId } });
        // click login button
        fireEvent.click(screen.getByText("Logg inn"));
        // check if login was successful
        expect(screen.getByText("Logg inn")).not.toBeInTheDocument();
    });
})