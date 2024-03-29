import styled from "styled-components";
import React from "react";

import { format } from "date-fns";
import { Minus, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/Card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import indoorSrc from "../../assets/indoor.png";
import outdoorSrc from "../../assets/outdoor.png";

import DatePicker from "../DatePicker";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { ReservationInput, reservationSchema } from "./reservation.schema";

interface Props {
    onSubmit: (values: ReservationInput) => void;
}

const ReservationForm: React.FC<Props> = ({ onSubmit }) => {
    const defaultDate = new Date();
    defaultDate.setHours(18, 0, 0, 0);
    const form = useForm<ReservationInput>({
        resolver: zodResolver(reservationSchema),
        defaultValues: {
            numGuests: 1,
            date: defaultDate,
            seatingLocation: "inside",
            occasion: undefined,
            specialRequests: "",
        },
    });
    return (
        <CardWrapper>
            <Card>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        data-testid="form"
                    >
                        <CardHeader>
                            <CardTitle>Reserve a table</CardTitle>
                            <CardDescription>
                                For a night to remember.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <StyledForm>
                                <FormField
                                    control={form.control}
                                    name="numGuests"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                How many diners?
                                            </FormLabel>
                                            <DataRow>
                                                <DataColumn>
                                                    <BigDisplay data-testid="numGuests">
                                                        {field.value}
                                                    </BigDisplay>
                                                </DataColumn>
                                                <ButtonColumn>
                                                    <Button
                                                        data-testid="minus"
                                                        disabled={
                                                            field.value <= 1
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            field.onChange(
                                                                field.value - 1
                                                            )
                                                        }
                                                    >
                                                        <Minus />
                                                    </Button>
                                                    <Button
                                                        data-testid="plus"
                                                        type="button"
                                                        disabled={
                                                            field.value >= 10
                                                        }
                                                        onClick={() =>
                                                            field.onChange(
                                                                field.value + 1
                                                            )
                                                        }
                                                    >
                                                        <Plus />
                                                    </Button>
                                                </ButtonColumn>
                                            </DataRow>
                                            <FormDescription>
                                                We can only accept bookings for
                                                up to 10 people.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>When?</FormLabel>
                                            <DataRow>
                                                <DataColumn>
                                                    <BigDisplay>
                                                        {format(
                                                            field.value,
                                                            "PPPP"
                                                        )}
                                                    </BigDisplay>
                                                    <SmallDisplay>
                                                        {format(
                                                            field.value,
                                                            "h:mm a"
                                                        )}
                                                    </SmallDisplay>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </DataColumn>
                                                <DataColumn>
                                                    <FormControl>
                                                        <DatePicker
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                </DataColumn>
                                            </DataRow>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="seatingLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Where would you like to sit?
                                            </FormLabel>
                                            <FormControl>
                                                <ToggleGroup
                                                    type="single"
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        if (value)
                                                            field.onChange(
                                                                value
                                                            );
                                                    }}
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem
                                                        value="inside"
                                                        aria-label="Toggle inside"
                                                        className="h-48 w-48 flex flex-col data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                                                        data-testid="indoorSeating"
                                                    >
                                                        <img
                                                            src={indoorSrc}
                                                            alt="indoor seating"
                                                            className="p-3"
                                                        />
                                                        <p>Indoor</p>
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem
                                                        value="outside"
                                                        aria-label="Toggle outside"
                                                        className="h-48 w-48 flex flex-col data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                                                        data-testid="outdoorSeating"
                                                    >
                                                        <img
                                                            src={outdoorSrc}
                                                            alt="outdoor seating"
                                                            className="p-3 text-inherit"
                                                        />
                                                        <p>Outdoor</p>
                                                    </ToggleGroupItem>
                                                </ToggleGroup>
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="occasion"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Are you celebrating a special
                                                occasion?
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger
                                                        className="w-[180px]"
                                                        data-testid="occasionBtn"
                                                    >
                                                        <SelectValue placeholder="Select an occasion" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem
                                                                value="birthday"
                                                                data-testid="birthday"
                                                            >
                                                                Birthday
                                                            </SelectItem>
                                                            <SelectItem
                                                                value="anniversary"
                                                                data-testid="anniversary"
                                                            >
                                                                Anniversary
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="specialRequests"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Do you have any special
                                                requests?
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </StyledForm>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" data-testid="submitBtn">
                                Finish
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    padding: 36px;
    width: 750px;
    margin: 0 auto;
`;

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const DataRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
const DataColumn = styled.div``;

const ButtonColumn = styled.div`
    display: flex;
    gap: 12px;
`;

const BigDisplay = styled.h2`
    padding-bottom: 0.5rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
`;

const SmallDisplay = styled.h3`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    scroll-margin: 5rem;
`;

export default ReservationForm;
