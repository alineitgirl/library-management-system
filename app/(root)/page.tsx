import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

const Page = () =>  (
    <>
        <BookOverview {...sampleBooks[0]}/>
        <BookList
            title="Популярное"
            books={sampleBooks}
            containerClassName="mt-28"
        />
    </>
);

export default Page;