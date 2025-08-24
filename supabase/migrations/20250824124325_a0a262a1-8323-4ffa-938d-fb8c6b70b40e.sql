-- Update quiz_responses table to store concerns as text and add new fields
ALTER TABLE quiz_responses 
ADD COLUMN IF NOT EXISTS concerns text;

-- Update the table to match the Quiz component structure
ALTER TABLE quiz_responses 
ALTER COLUMN diet_habits TYPE text;

-- Add a table to store personalized routines
CREATE TABLE IF NOT EXISTS personalized_routines (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  quiz_response_id uuid REFERENCES quiz_responses(id),
  routine_data jsonb NOT NULL,
  ai_recommendations text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on personalized_routines
ALTER TABLE personalized_routines ENABLE ROW LEVEL SECURITY;

-- Create policies for personalized_routines
CREATE POLICY "Anyone can create personalized routines" 
ON personalized_routines 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own personalized routines" 
ON personalized_routines 
FOR SELECT 
USING ((auth.uid() = user_id) OR (user_id IS NULL));

-- Add trigger for updated_at on personalized_routines
CREATE TRIGGER update_personalized_routines_updated_at
BEFORE UPDATE ON personalized_routines
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();